import { useEffect, useState } from "react";
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
  const [errorType, setErrorType] = useState<"server" | "wrong_device" | null>(null);

  useEffect(() => {
    setTimeout(() => {
      // DEV MODE
      // setLaunchInfo({ isDevMode: false, isLoading: false });
      authApi
        .authMe()
        .then((res) => {
          setUserInfo(res.data);
          setLaunchInfo({ isLoading: false });
        })
        .catch(() => {
          authApi
            .registerUser()
            .then((res) => {
              setUserInfo(res.data);
              setLaunchInfo({ isLoading: false, isFirstLaunch: true });
            })
            .catch(() => {
              setErrorType("server");
              // launchInfo?.isDevMode && setLaunchInfo({ isLoading: false });
            });
        });
    }, 1000);
  }, []);

  return (
    <>
      {launchInfo?.isLoading && (
        <div className="preloader">
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
