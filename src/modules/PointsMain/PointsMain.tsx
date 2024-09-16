import { useState } from "react";
import Button from "../../shared/components/Button/Button";
import IconPoints from "../../shared/icons/IconPoints";
import "./PointsMain.scss";
import { useRecoilState } from "recoil";
import { UserState, userState } from "../../store/userState";
import { authApi } from "../../api/authApi";

const PointsMain = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [timeLeft, setTimeLeft] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onClaimHandler = () => {
    setButtonLoading(true);

    //TODO: запрос на бэк на клейм, пока что симуляция через таймаут
    authApi.pointsClaim().then((res) => {
      // @ts-ignore
      const updatedInfo: UserState = {
        ...userInfo,
        user: { point_balance: res.data.balance },
      };
      console.log(res.data);
      setUserInfo(updatedInfo);
    });

    setTimeout(() => {
      setTimeLeft(5000);
      setButtonLoading(false);
    }, 1000);
  };

  return (
    <div className="points-main">
      <div className="points-main__top">
        <div className="points-main__icon">
          <IconPoints />
        </div>
        <div className="points-main__stats">
          <p className="points-main__stats-text">Points on your account</p>
          <p className="points-main__stats-count">
            {userInfo?.user?.point_balance}
          </p>
        </div>
      </div>
      <p className="points-main__description">
        You can get these points for active participation on the Predicton —
        participate in predictions, complete tasks and challenges, invite frens
      </p>
      <Button
        classname="points-main__button"
        onClick={timeLeft === 0 ? onClaimHandler : () => ""}
        isDisabled={timeLeft !== 0}
        isLoading={buttonLoading}
        isPrimary
        text={timeLeft ? "Next bonus: 23h 59m" : "Daily Bonus (+15 points)"}
      />
    </div>
  );
};

export default PointsMain;
