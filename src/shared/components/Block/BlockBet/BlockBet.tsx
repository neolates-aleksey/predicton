import classNames from "classnames";
import { useState } from "react";
import IconClose from "../../../icons/IconClose";
import PercentTabs from "../../PercentTabs/PercentTabs";
import "./BlockBet.scss";
import Button from "../../Button/Button";
import Range from "../../Range/Range";

interface IBlockBet {
  closeHandler: () => void;
  side: false | "UP" | "DOWN";
  className: string;
}

const BlockBet = ({ closeHandler, side, className }: IBlockBet) => {
  const [balance] = useState<number>(2);
  const [betValue, setBetValue] = useState<number | null>(null);

  const handleInputChange = (value: number) => {
    if (value > balance) {
      setBetValue(balance);
    } else {
      setBetValue(value);
    }
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

        <PercentTabs onTabChange={setBetValue} balance={balance} />
      </div>

      <Range />

      <Button
        classname="block-bet__bet-btn"
        isRounded
        isPrimary
        isDisabled={!betValue || betValue < 0.5 || betValue > balance}
        text="Make a Prediction"
      />

      <p className="block-bet__info">
        You won't be able to delete or change your position once you make a
        prediction
      </p>
    </div>
  );
};

export default BlockBet;
