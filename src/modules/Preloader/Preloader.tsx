import { RefObject, useEffect, useRef, useState } from "react";
import { authApi } from "../../api/authApi";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import { launchState } from "../../store/launchState";
import "./Preloader.scss";
import IconLogo from "../../shared/icons/IconLogo";
import ServerError from "./ServerError/ServerError";

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
      // setLaunchInfo({ isDevMode: false, isLoading: false });
      authApi
        .authMe()
        .then((res) => {
          setFadeOut("loaded");
          setUserInfo(res.data);
        })
        .catch(() => {
          authApi
            .registerUser()
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
