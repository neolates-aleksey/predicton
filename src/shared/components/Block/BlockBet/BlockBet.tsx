import classNames from "classnames";
import { useState } from "react";
import IconClose from "../../../icons/IconClose";
import PercentTabs from "../../PercentTabs/PercentTabs";
import "./BlockBet.scss";
import Button from "../../Button/Button";
import Range from "../../Range/Range";
import { useRecoilState } from "recoil";
import { userState } from "../../../../store/userState";
import { betsApi } from "../../../../api/betsApi";

interface IBlockBet {
  closeHandler: () => void;
  side: false | "UP" | "DOWN";
  className: string;
}

const BlockBet = ({ closeHandler, side, className }: IBlockBet) => {
  const [userInfo] = useRecoilState(userState);

  const [betValue, setBetValue] = useState<number | null>(null);

  const handleInputChange = (value: number) => {
    const userBalance = userInfo?.user?.point_balance;
    if (userBalance) {
      if (value > userBalance) {
        setBetValue(userBalance);
      } else {
        if (value < 0) {
          setBetValue(0);
        } else {
          setBetValue(value);
        }
      }
    }
  };

  const handleMakeBet = () => {
    closeHandler();
    betValue &&
      side &&
      betsApi.makeBet(betValue, side).then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className={classNames("block-bet", className)}>
      <div className="block-bet__header">
        <p className="block-bet__title">
          Set prediction{" "}
          <span
            className={classNames("block-bet__title-side", {
              "block-bet__title-side_green": side === "UP",
              "block-bet__title-side_red": side === "DOWN",
            })}
          >
            {side}
          </span>
        </p>

        <div className="block-bet__close" onClick={closeHandler}>
          <IconClose className="block-bet__close-btn" />
        </div>
      </div>
      <div className="block-bet__content">
        <input
          value={betValue ? betValue : undefined}
          onChange={(e) => handleInputChange(Number(e.target.value))}
          placeholder="min 0.5 USDT"
          className="block-bet__input"
          type="number"
        />

        {userInfo?.user?.point_balance && <PercentTabs onTabChange={setBetValue} balance={userInfo?.user?.point_balance} />}
      </div>

      <Range />

      <Button
        onClick={() => handleMakeBet()}
        classname="block-bet__bet-btn"
        isRounded
        isPrimary
        isDisabled={!betValue || betValue < 0.5}
        text="Make a Prediction"
      />

      <p className="block-bet__info">You won't be able to delete or change your position once you make a prediction</p>
    </div>
  );
};

export default BlockBet;
