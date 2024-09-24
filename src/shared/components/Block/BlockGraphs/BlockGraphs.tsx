import React, { useEffect, useState } from "react";
import IconArrowDown from "../../../icons/IconArrowDown";
import IconArrowUp from "../../../icons/IconArrowUp";
import classNames from "classnames";
import { BlockState } from "../Block";
import "./BlockGraphs.scss";

interface IBlockGraphs {
  up_sum: number;
  down_sum: number;
  up_rate: number;
  down_rate: number;
  blockState: BlockState;
  users_up: number;
  users_down: number;
}

const BlockGraphs = ({
  up_sum,
  down_sum,
  up_rate,
  down_rate,
  blockState,
  users_down,
  users_up,
}: IBlockGraphs) => {
  const [upPercent, setUpPercent] = useState(30);
  const [downPercent, setDownPercent] = useState(30);

  useEffect(() => {
    if (up_rate > 1.95) {
      setUpPercent(50);
      setDownPercent(50);
    }

    if (up_rate > 2.05 && down_rate < 2.3) {
      setUpPercent(60);
      setDownPercent(40);
    }

    if (up_rate > 2.3) {
      setUpPercent(70);
      setDownPercent(30);
    }

    if (up_rate < 1.3) {
      setUpPercent(20);
    }
  }, [up_rate]);

  return (
    <div className="block-graphs">
      <div className={"block-graphs__item block-graphs__item_up"}>
        <div className="block-graphs__item-payout">
          <p className="block-graphs__rate">{down_rate.toFixed(2)}x</p>
          <p className="block-graphs__payout">Payout</p>
        </div>
        <div
          style={{ height: `${downPercent}%` }}
          className={classNames(
            "block-graphs__item-bets block-graphs__item-bets_down",
            {
              "block-graphs__item-bets_down_outline":
                blockState === "on_bet" || blockState === "wait_for_bet",
            }
          )}
        >
          <div className="block-graphs__bet-arrow">
            <IconArrowUp color={"white"} />
          </div>
          <div className="block-graphs__bet-info">
            <p className="block-graphs__bet-sum">{down_sum} $</p>
            <p className="block-graphs__bet-count">{users_down} users</p>
          </div>
        </div>
      </div>

      <div className="block-graphs__item block-graphs__item_down">
        <div className="block-graphs__item-payout">
          <p className="block-graphs__rate">{up_rate.toFixed(2)}x</p>
          <p className="block-graphs__payout">Payout</p>
        </div>
        <div
          style={{ height: `${upPercent}%` }}
          className={classNames(
            "block-graphs__item-bets block-graphs__item-bets_up",
            {
              "block-graphs__item-bets_up_outline":
                blockState === "on_bet" || blockState === "wait_for_bet",
            }
          )}
        >
          <div className="block-graphs__bet-arrow">
            <IconArrowDown
              color={
                blockState === "on_bet" || blockState === "wait_for_bet"
                  ? "white"
                  : "black"
              }
            />
          </div>
          <div className="block-graphs__bet-info block-graphs__bet-info_up">
            <p className="block-graphs__bet-sum">{up_sum} $</p>
            <p className="block-graphs__bet-count">{users_up} users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockGraphs;
