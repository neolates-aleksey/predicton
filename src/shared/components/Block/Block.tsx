import React from "react";
import "./Block.scss";
import classNames from "classnames";

export enum BlockState {
  "on_bet",
  "locked",
  "ended",
}

export interface IBlock {
  block_hash: string;
  previous_block_hash: string;
  block_started_at: Date;
  block_will_end_at: Date;
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
  block_started_at,
  block_will_end_at,
  locked_at,
  state,
  current_price,
  locked_price,
  current_up_rate,
  current_down_rate,
}: IBlock) => {
  return (
    <div className="block">
      <div className="block__header">
        <span className="block__status">{state === "locked" && "LIVE"}</span>
        <span className="block__hash">#{block_hash}</span>
      </div>
      {state === "locked" && (
        <div className="block__body">
          <div className="block__up">{current_up_rate}X payout</div>
          <div className="block__locked">
            <div className="block__last-price">
              <span>Last price:</span>
              <p
                className={classNames("block__current-price", {
                  "block__current-price_red": current_price < locked_price,
                  "block__current-price_green": current_price > locked_price,
                })}
              >
                ${current_price}
              </p>
            </div>
          </div>
          <div className="block__down">{current_down_rate}X payout</div>
        </div>
      )}
    </div>
  );
};

export default Block;
