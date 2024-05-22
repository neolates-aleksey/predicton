import { useState } from "react";
import "./PercentTabs.scss";
import classNames from "classnames";

interface IPercentTabs {
  balance: number;
}

const PercentTabs = ({ balance }: IPercentTabs) => {
  const [activeTab, setActiveTab] = useState<Number | null>(null);

  return (
    <div className="percent-tabs">
      <div onClick={() => setActiveTab(10)} className={classNames("percent-tabs__item", { "percent-tabs__item_active": activeTab === 10 })}>
        10%
      </div>
      <div onClick={() => setActiveTab(25)} className={classNames("percent-tabs__item", { "percent-tabs__item_active": activeTab === 25 })}>
        25%
      </div>
      <div onClick={() => setActiveTab(50)} className={classNames("percent-tabs__item", { "percent-tabs__item_active": activeTab === 50 })}>
        50%
      </div>
      <div onClick={() => setActiveTab(75)} className={classNames("percent-tabs__item", { "percent-tabs__item_active": activeTab === 75 })}>
        75%
      </div>
      <div onClick={() => setActiveTab(100)} className={classNames("percent-tabs__item", { "percent-tabs__item_active": activeTab === 100 })}>
        100%
      </div>
    </div>
  );
};

export default PercentTabs;
