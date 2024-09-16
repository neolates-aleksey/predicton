import { useEffect } from "react";
import { authApi } from "../../api/authApi";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import { launchState } from "../../store/launchState";
import "./Preloader.scss";
import IconLogo from "../../shared/icons/IconLogo";

const Preloader = () => {
  const [, setUserInfo] = useRecoilState(userState);
  const [launchInfo, setLaunchInfo] = useRecoilState(launchState);

  useEffect(() => {
    // DEV MODE

    setTimeout(() => {
      setLaunchInfo({ isDevMode: true, isLoading: false });
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
            <IconLogo />
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
