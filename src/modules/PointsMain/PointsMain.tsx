import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import MotionNumber from "motion-number";

import { UserState, userState } from "../../store/userState";
import { authApi } from "../../api/authApi";

import Button from "../../shared/components/Button/Button";
import IconPoints from "../../shared/icons/IconPoints";
import { timeLeftToString } from "../../shared/helpers/timeLeftToString";

import "./PointsMain.scss";

const PointsMain = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  const onClaimHandler = () => {
    setButtonLoading(true);

    authApi.pointsClaim().then((res) => {
      // @ts-ignore
      const updatedInfo: UserState = {
        ...userInfo,
        user: {
          point_balance: res.data.balance,
          points_claim_info: {
            ...userInfo?.user.points_claim_info,
            end_at: res.data.end_at,
          },
        },
      };

      setUserInfo(updatedInfo);
    });

    setTimeout(() => {
      setButtonLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let intervalId = null;

    const end_time = userInfo?.user.points_claim_info?.end_at;

    if (end_time && end_time > 0 && end_time > Math.floor(Date.now() / 1000)) {
      const calculateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remaining = end_time - currentTime;
        setSecondsRemaining(Math.max(remaining, 0));

        setTimeLeft(timeLeftToString(Math.max(remaining, 0)));
      };

      calculateRemainingTime();

      intervalId = setInterval(calculateRemainingTime, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [userInfo]);

  return (
    <div className="points-main">
      <div className="points-main__top">
        <div className="points-main__icon">
          <IconPoints />
        </div>
        <div className="points-main__stats">
          <p className="points-main__stats-text">Points on your account</p>
          <p className="points-main__stats-count">
            {userInfo?.user?.point_balance && (
              <MotionNumber
                value={userInfo?.user?.point_balance}
                format={{ notation: "standard" }}
                locales="en-US"
              />
            )}
          </p>
        </div>
      </div>
      <p className="points-main__description">
        You can get these points for active participation on the Predicton —
        participate in predictions, complete tasks and challenges, invite frens
      </p>
      <Button
        classname="points-main__button"
        onClick={secondsRemaining === 0 ? onClaimHandler : () => ""}
        isDisabled={secondsRemaining !== 0}
        isLoading={buttonLoading}
        isPrimary
        text={
          secondsRemaining
            ? `Next bonus: ${timeLeft}`
            : `Daily Bonus (+${userInfo?.user.points_claim_info?.current_points_award} points)`
        }
      />
    </div>
  );
};

export default PointsMain;
