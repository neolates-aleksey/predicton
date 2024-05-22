import { useEffect, useState } from "react";
import "./PercentTabs.scss";
import classNames from "classnames";

interface IPercentTabs {
  balance: number;
  onTabChange: any;
}

const PercentTabs = ({ balance, onTabChange }: IPercentTabs) => {
  const [percent, setPercent] = useState<Number | null>(null);

  useEffect(() => {
    if (percent) {
      console.log("final value: ", (percent * balance) / 100);
      onTabChange((percent * balance) / 100);
    }
  }, [percent]);

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
