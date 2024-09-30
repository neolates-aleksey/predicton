import { useEffect, useRef, useState } from "react";
import { authApi } from "../../api/authApi";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import { launchState } from "../../store/launchState";
import IconLogo from "../../shared/icons/IconLogo";
import ServerError from "./ServerError/ServerError";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import "./Preloader.scss";

const Preloader = () => {
  const [, setUserInfo] = useRecoilState(userState);
  const [launchInfo, setLaunchInfo] = useRecoilState(launchState);
  const [errorType, setErrorType] = useState<"server" | "wrong_device" | null>(
    null
  );
  const [fadeOut, setFadeOut] = useState<boolean | "loaded">(true);
  const preloaderRef: any = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // DEV MODE
      // setLaunchInfo({ isDevMode: true, isLoading: true });
      authApi
        .authMe()
        .then((res) => {
          setFadeOut("loaded");
          setUserInfo(res.data);
        })
        .catch(() => {
          let launchParam;

          try {
            const params = retrieveLaunchParams();
            console.log(params);

            launchParam = params.initData?.startParam;
            console.log("launch param: ", launchParam);
          } catch (e) {
            console.log("not twa");
          }

          authApi
            .registerUser(launchParam)
            .then((res) => {
              setFadeOut("loaded");
              setUserInfo(res.data);
              setLaunchInfo({ isFirstLaunch: true });
            })
            .catch(() => {
              setErrorType("server");
              // launchInfo?.isDevMode && setLaunchInfo({ isLoading: false });
            });
        });
    }, 1000);
  }, []);

  useEffect(() => {
    if (fadeOut === "loaded") {
      preloaderRef.current.style.opacity = "0";
      setFadeOut(false);

      setTimeout(() => {
        setLaunchInfo({ isLoading: false });
      }, 500);
    }
  }, [fadeOut]);

  return (
    <>
      {launchInfo?.isLoading && (
        <div ref={preloaderRef} className="preloader">
          <div className="preloader__content">
            {!errorType && <IconLogo />}
            {errorType === "server" && <ServerError />}
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
