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
  block_num?: number;
  state: "on_bet" | "locked" | "ended";
  locked_price: number;
  current_price: number;
  coin: "TON";
  up_bet_sum: number;
  down_bet_sum: number;
  current_up_rate: number;
  current_down_rate: number;
}

// bet_started_at: 1720361341;
// bet_will_end_at: 1720361641;
// block_hash: "9fa1e608effd0598fe34f2d80fac24fec745ada9713faad8e0d825386f6062a2621aeeee505ef0e1c8cc24c2b3f528ee2e96955211561553f90f51fed1e013e4";
// block_num: 3;
// coin: "TON";
// created_at: 1720361341;
// current_down_rate: 0;
// current_price: 7.3007;
// current_up_rate: 0;
// down_bet_sum: 0;
// is_genesis: false;
// locked_at: 1720361646;
// locked_price: 7.2927;
// previous_block_hash: "2a253647e48179475fc59f2de40963f33d175838591863297ca288bd03b2fce65def6ec3a5253b73e745cad6a2b5ef91611e147835de915f837368183de79a29";
// state: "locked";
// up_bet_sum: 0;
// will_end_at: 1720361946;
// winning_side: "up";

const Block = ({
  block_hash,
  previous_block_hash,
  bet_started_at,
  bet_will_end_at,
  locked_at,
  block_num,
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
      <BlockHeader
        block_num={block_num}
        state={state}
        end_time={bet_will_end_at}
      />

      <div
        className={classNames("block__body", {
          block__body_red: locked_price < current_price,
          block__body_green: locked_price > current_price,
        })}
      >
        <div className="block__graphs">
          <BlockGraphs
            up_sum={up_bet_sum}
            down_sum={down_bet_sum}
            up_rate={current_up_rate}
            down_rate={current_down_rate}
          />
        </div>
        <div className="block__info">
          {state === "on_bet" ? (
            <div className="block__prediction">
              <p className="block__prediction-title">Make Your Prediction</p>

              <div className="block__prediction-buttons">
                <div
                  onClick={() => onBetOpen("DOWN")}
                  className="block__prediction-button block__prediction-button_red"
                >
                  <IconArrowUp />
                  DOWN
                </div>
                <div
                  onClick={() => onBetOpen("UP")}
                  className="block__prediction-button block__prediction-button_green"
                >
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
          <BlockBet
            className={classNames(
              isMounted ? "mountedStyle" : "unmountedStyle"
            )}
            side={controlOpen}
            closeHandler={onBetClose}
          />
        )}
      </div>
    </div>
  );
};

export default Block;
