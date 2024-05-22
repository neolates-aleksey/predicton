import classNames from "classnames";
import IconClose from "../../../icons/IconClose";
import "./BlockBet.scss";
import PercentTabs from "../../PercentTabs/PercentTabs";
import { useState } from "react";

interface IBlockBet {
  closeHandler: () => void;
  side: false | "UP" | "DOWN";
  className: string;
}

const BlockBet = ({ closeHandler, side, className }: IBlockBet) => {
  const [balance, setBalance] = useState<number>(2);
  const [betValue, setBetValue] = useState<number>(0);

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
        <input value={betValue} placeholder="min 0.5 USDT" className="block-bet__input" type="text" />

        <PercentTabs />
      </div>
    </div>
  );
};

export default BlockBet;
