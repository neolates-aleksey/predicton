import { useState } from "react";
import Button from "../../shared/components/Button/Button";
import IconPoints from "../../shared/icons/IconPoints";
import "./PointsMain.scss";

const PointsMain = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onClaimHandler = () => {
    setButtonLoading(true);

    //TODO: запрос на бэк на клейм, пока что симуляция через таймаут
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
          <p className="points-main__stats-count">1,946</p>
        </div>
      </div>
      <p className="points-main__description">
        You can get these points for active participation on the Predicton — participate in predictions, complete tasks and challenges, invite frens
      </p>
      <Button
        onClick={timeLeft === 0 ? onClaimHandler : () => ""}
        isDisabled={timeLeft !== 0}
        isLoading={buttonLoading}
        isPrimary
        text={timeLeft ? "Next bonus: N hours" : "Daily Bonus (+15 points)"}
      />
    </div>
  );
};

export default PointsMain;
