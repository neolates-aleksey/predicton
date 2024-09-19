import { useEffect, useState } from "react";
import "./PercentTabs.scss";
import classNames from "classnames";

interface IPercentTabs {
  balance: number;
  onTabChange: any;
  betValue: number | null;
}

const PercentTabs = ({ balance, onTabChange, betValue }: IPercentTabs) => {
  const [percent, setPercent] = useState<number | null>(null);

  useEffect(() => {
    if (percent) {
      onTabChange((percent * balance) / 100);
    }
  }, [percent]);

  useEffect(() => {
    if (percent) {
      if (betValue && betValue !== (percent * balance) / 100) {
        setPercent(null);
      }
    }
  }, [betValue]);

  return (
    <div className="percent-tabs">
      <div
        onClick={() => setPercent(10)}
        className={classNames("percent-tabs__item", {
          "percent-tabs__item_active": percent === 10,
        })}
      >
        10%
      </div>
      <div
        onClick={() => setPercent(25)}
        className={classNames("percent-tabs__item", {
          "percent-tabs__item_active": percent === 25,
        })}
      >
        25%
      </div>
      <div
        onClick={() => setPercent(50)}
        className={classNames("percent-tabs__item", {
          "percent-tabs__item_active": percent === 50,
        })}
      >
        50%
      </div>
      <div
        onClick={() => setPercent(75)}
        className={classNames("percent-tabs__item", {
          "percent-tabs__item_active": percent === 75,
        })}
      >
        75%
      </div>
      <div
        onClick={() => setPercent(100)}
        className={classNames("percent-tabs__item", {
          "percent-tabs__item_active": percent === 100,
        })}
      >
        100%
      </div>
    </div>
  );
};

export default PercentTabs;
