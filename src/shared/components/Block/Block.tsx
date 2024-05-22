import classNames from "classnames";
import BlockGraphs from "./BlockGraphs/BlockGraphs";
import BlockHeader from "./BlockHeader/BlockHeader";
import BlockInfo from "./BlockInfo/BlockInfo";
import IconArrowDown from "../../icons/IconArrowDown";
import IconArrowUp from "../../icons/IconArrowUp";
import { useState } from "react";
import BlockBet from "./BlockBet/BlockBet";
import useDelayUnmount from "../../helpers/useDelayUnmount";
import "./Block.scss";

export enum BlockState {
  "on_bet",
  "locked",
  "ended",
}

export interface IBlock {
  block_hash: string;
  previous_block_hash: string;
  bet_started_at: Date;
  bet_will_end_at: Date;
  locked_at?: Date;
  will_end_at?: Date;
  state: "on_bet" | "locked" | "ended";
  locked_price: number;
  current_price: number;
  coin: "TON";
  up_bet_sum: number;
  down_bet_sum: number;
  current_up_rate: number;
  current_down_rate: number;
}

const Block = ({
  block_hash,
  previous_block_hash,
  bet_started_at,
  bet_will_end_at,
  locked_at,
  state,
  current_price,
  locked_price,
  current_up_rate,
  current_down_rate,
  up_bet_sum,
  down_bet_sum,
}: IBlock) => {
  const [controlOpen, setControlOpen] = useState<false | "UP" | "DOWN">(false);

  const [isMounted, setIsMounted] = useState(false);
  const shouldRenderChild = useDelayUnmount(isMounted, 200);

  const onBetOpen = (side: "UP" | "DOWN") => {
    setIsMounted(true);
    setControlOpen(side);
  };

  const onBetClose = () => {
    setIsMounted(false);
    setControlOpen(false);
  };

  return (
    <div className={classNames("block", { block_ended: state === "ended" })}>
      <BlockHeader state={state} end_time={bet_will_end_at} />

      <div
        className={classNames("block__body", {
          block__body_red: locked_price < current_price,
          block__body_green: locked_price > current_price,
        })}
      >
        <div className="block__graphs">
          <BlockGraphs up_sum={up_bet_sum} down_sum={down_bet_sum} up_rate={current_up_rate} down_rate={current_down_rate} />
        </div>
        <div className="block__info">
          {state === "on_bet" ? (
            <div className="block__prediction">
              <p className="block__prediction-title">Make Your Prediction</p>

              <div className="block__prediction-buttons">
                <div onClick={() => onBetOpen("DOWN")} className="block__prediction-button block__prediction-button_red">
                  <IconArrowUp />
                  DOWN
                </div>
                <div onClick={() => onBetOpen("UP")} className="block__prediction-button block__prediction-button_green">
                  <IconArrowDown />
                  UP
                </div>
              </div>
            </div>
          ) : (
            <BlockInfo
              last_price={current_price}
              locked_price={locked_price}
              prize_pool={up_bet_sum + down_bet_sum}
              change={locked_price - current_price}
            />
          )}
        </div>

        {shouldRenderChild && (
          <BlockBet className={classNames(isMounted ? "mountedStyle" : "unmountedStyle")} side={controlOpen} closeHandler={onBetClose} />
        )}
      </div>
    </div>
  );
};

export default Block;
