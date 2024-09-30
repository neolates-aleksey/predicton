import { act, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TTabName } from "../../pages/Account/Account";
import HistoryItem from "../../shared/components/HistoryItem/HistoryItem";
import {
  IPointsHistory,
  pointsHistoryState,
  THistoryTotal,
  TPointsHistoryList,
} from "../../store/history";
import { BetHistory, betsApi } from "../../api/betsApi";
import "./History.scss";
import classNames from "classnames";
import SmallLoader from "../../shared/components/SmallLoader/SmallLoader";

interface HistoryProps {
  tab: TTabName;
}

const History = ({ tab }: HistoryProps) => {
  const [pointsHistory, setPointsHistory] = useRecoilState(pointsHistoryState);
  const [activeFilter, setActiveFilter] =
    useState<keyof TPointsHistoryList>("all");
  const [currentList, setCurrentList] = useState<BetHistory[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleKeyChange = (newKey: keyof THistoryTotal) => {
    setActiveFilter(newKey);
  };

  useEffect(() => {
    betsApi.myBetsHistory(50, "point_block").then((res) => {
      const totals = { all: 4, loose: 0, win: 4, up: 1, down: 3 };
      const resBets = res.data.data;

      setPointsHistory({ bets: resBets, total: totals });
      setIsLoading(false);
      setCurrentList(resBets.all);
    });
  }, []);

  useEffect(() => {
    if (pointsHistory) {
      setCurrentList(pointsHistory.bets[activeFilter]);
    }
  }, [activeFilter]);

  return (
    <div className="history">
      <div className="history__tabs">
        <div className="filter">
          {pointsHistory &&
            Object.entries(pointsHistory.total).map(([key, value]) => (
              <div
                // @ts-ignore
                onClick={() => handleKeyChange(key)}
                className={classNames("filter__item", {
                  filter__item_active: activeFilter === key,
                })}
                key={key}
              >
                <p className="filter__item-text">
                  {key} <span className="filter__item-divider">{value}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="history__list">
        {currentList &&
          !isLoading &&
          currentList.map((item) => (
            <HistoryItem key={item.made_at} bet={item} />
          ))}

        {currentList && !isLoading && currentList.length === 0 && (
          <p className="history__alert">
            There will be your predictions history
          </p>
        )}

        {isLoading && (
          <div className="history__loader">
            <SmallLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
