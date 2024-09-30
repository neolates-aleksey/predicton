import MotionNumber from "motion-number";
import BlocksGrid from "../../modules/BlocksGrid/BlocksGrid";
import IconTonUsdt from "../../shared/icons/IconTonUsdt";
import "./Main.scss";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import { blocksState } from "../../store/blocks";

const Main = () => {
  const [userInfo] = useRecoilState(userState);
  const [blocksData] = useRecoilState(blocksState);
  const [coinPrice, setCoinPrice] = useState<number | null>(null);

  useEffect(() => {
    const getPriceFromBlock = () => {
      if (blocksData?.next.current_price) {
        return blocksData?.next.current_price;
      }
      if (blocksData?.current.current_price) {
        return blocksData?.current.current_price;
      }
    };

    const currentPrice = getPriceFromBlock();

    if (coinPrice !== currentPrice) {
      currentPrice && setCoinPrice(Number(currentPrice.toFixed(4)));
    }
  }, [blocksData]);

  return (
    <div className="main">
      <div className="main__upper">
        <div className="main__item">
          <div className="main__item-pair">
            <IconTonUsdt />
            <div className="main__item-pair-content">
              <p className="main__item-title">TON/USDT</p>
              <p className="main__item-text">
                {coinPrice ? (
                  <MotionNumber
                    value={coinPrice}
                    format={{ notation: "standard" }}
                    locales="en-US"
                  />
                ) : (
                  "loading"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="main__item">
          <div className="main__item-balance">
            <p className="main__item-title">Balance</p>
            <p className="main__item-text">
              {userInfo?.user?.point_balance && (
                <MotionNumber
                  value={userInfo?.user?.point_balance}
                  format={{ notation: "standard" }}
                  locales="en-US"
                />
              )}{" "}
              P.
            </p>
          </div>
        </div>
      </div>
      <BlocksGrid />
    </div>
  );
};

export default Main;
