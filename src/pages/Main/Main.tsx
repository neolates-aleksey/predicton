import MotionNumber from "motion-number";
import BlocksGrid from "../../modules/BlocksGrid/BlocksGrid";
import IconTonUsdt from "../../shared/icons/IconTonUsdt";
import "./Main.scss";
import { useEffect, useState } from "react";

const Main = () => {
  const [first, setfirst] = useState(6.5323);

  useEffect(() => {
    setInterval(() => {
      setfirst((prev) => prev + Math.random());
    }, 3000);
  }, []);

  return (
    <div className="main">
      <div className="main__upper">
        <div className="main__item">
          <div className="main__item-pair">
            <IconTonUsdt />
            <div className="main__item-pair-content">
              <p className="main__item-title">TON/USDT</p>
              <p className="main__item-text">
                <MotionNumber
                  value={first}
                  format={{ notation: "standard" }}
                  locales="en-US"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="main__item">
          <div className="main__item-balance">
            <p className="main__item-title">Balance</p>
            <p className="main__item-text">240 POINTS</p>
          </div>
        </div>
      </div>
      <BlocksGrid />
    </div>
  );
};

export default Main;
