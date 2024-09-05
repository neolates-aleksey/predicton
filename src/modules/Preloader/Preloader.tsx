import { useEffect } from "react";
import { authApi } from "../../api/authApi";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import { launchState } from "../../store/launchState";
import "./Preloader.scss";

const Preloader = () => {
  const [, setUserInfo] = useRecoilState(userState);
  const [launchInfo, setLaunchInfo] = useRecoilState(launchState);

  useEffect(() => {
    setTimeout(() => {
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
              console.log(res.data);
              setLaunchInfo({ isLoading: false, isFirstLaunch: true });
            })
            .catch((er) => {
              console.log(er);
            });
        });
    }, 2000);
  }, []);

  return (
    <>
      {launchInfo?.isLoading && (
        <div className="preloader">
          <div className="preloader__content">
            <h1>LOADING....</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
