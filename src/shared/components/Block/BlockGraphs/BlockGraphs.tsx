import React, { useEffect, useState } from "react";
import IconArrowDown from "../../../icons/IconArrowDown";
import IconArrowUp from "../../../icons/IconArrowUp";
import "./BlockGraphs.scss";

interface IBlockGraphs {
  up_sum: number;
  down_sum: number;
  up_rate: number;
  down_rate: number;
}

const BlockGraphs = ({ up_sum, down_sum, up_rate, down_rate }: IBlockGraphs) => {
  const [upPercent, setUpPercent] = useState(30);
  const [downPercent, setDownPercent] = useState(30);

  useEffect(() => {
    if (up_rate > 1.95 && up_rate < 2.05) {
      setUpPercent(50);
      setDownPercent(50);
    }

    if (up_rate > 2.05 && up_rate < 2.3) {
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
      <div className="block-graphs__item block-graphs__item_up">
        <div className="block-graphs__item-payout">
          <p className="block-graphs__rate">{down_rate.toFixed(4)}x</p>
          <p className="block-graphs__payout">Payout</p>
        </div>
        <div style={{ height: `${downPercent}%` }} className="block-graphs__item-bets block-graphs__item-bets_down">
          <div className="block-graphs__bet-arrow">
            <IconArrowUp />
          </div>
          <div className="block-graphs__bet-info">
            <p className="block-graphs__bet-sum">${down_sum}</p>
            <p className="block-graphs__bet-count">12 users bet</p>
          </div>
        </div>
      </div>
      <div className="block-graphs__item block-graphs__item_down">
        <div className="block-graphs__item-payout">
          <p className="block-graphs__rate">{up_rate.toFixed(4)}x</p>
          <p className="block-graphs__payout">Payout</p>
        </div>
        <div style={{ height: `${upPercent}%` }} className="block-graphs__item-bets block-graphs__item-bets_up">
          <div className="block-graphs__bet-arrow">
            <IconArrowDown />
          </div>
          <div className="block-graphs__bet-info block-graphs__bet-info_up">
            <p className="block-graphs__bet-sum">${up_sum}</p>
            <p className="block-graphs__bet-count">12 users bet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockGraphs;
