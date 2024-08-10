import React, { useEffect, useState } from "react";
import { TTabName } from "../../pages/Account/Account";
import {
  predictionsMock,
  transactionsMock,
} from "../../shared/mocks/historyMocks";
import "./History.scss";
import classNames from "classnames";
import HistoryItem from "../../shared/components/HistoryItem/HistoryItem";

interface HistoryProps {
  tab: TTabName;
}

export type IPrediction = {
  id: number;
  side: "UP" | "DOWN";
  result: "LOSE" | "WIN";
  coef: number;
  bet_amount: number;
  result_amount: number;
  date: string;
};

export type ITransaction = {
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  date: Date;
  status: "???";
};

type TransactionFilter = {
  all: number;
  deposit: number;
  withdraw: number;
};

type PredictionFilter = {
  all: number;
  up: number;
  down: number;
  win: number;
  lose: number;
};

const History = ({ tab }: HistoryProps) => {
  const [historyList, setHistoryList] = useState<IPrediction[] | false>(
    predictionsMock
  );

  const [filteredHistoryList, setFilteredHistoryList] = useState<
    IPrediction[] | false
  >(false);

  const [filters, setFilters] = useState<
    PredictionFilter | TransactionFilter | null
  >(null);

  const [activeFilter, setActiveFilter] = useState<any>("all");

  useEffect(() => {
    if (
      (historyList as IPrediction[])[0] &&
      (historyList as IPrediction[])[0].side
    ) {
      const predictionData = historyList as IPrediction[];
      const predictionFilters: PredictionFilter = {
        all: predictionData.length,
        up: predictionData.filter((pred) => pred.side === "UP").length,
        down: predictionData.filter((pred) => pred.side === "DOWN").length,
        lose: predictionData.filter((pred) => pred.result === "LOSE").length,
        win: predictionData.filter((pred) => pred.result === "WIN").length,
      };
      setFilters(predictionFilters);

      // console.log(predictionFilters);

      // setActiveFilter(predictionFilters.all);
    }
  }, []);

  const onFilterClick = (key: string) => {
    setActiveFilter(key);
  };

  function filterHistoryArray(initArray: IPrediction[]): any[] {
    if (activeFilter === "all") return initArray;

    return initArray.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(activeFilter)
      )
    );
  }

  useEffect(() => {
    console.log(activeFilter);

    if (activeFilter) {
      const searchResults = historyList && filterHistoryArray(historyList);

      searchResults && setFilteredHistoryList(searchResults);

      console.log(searchResults);
    }
  }, [activeFilter]);

  useEffect(() => {
    // TODO: fetch с параметром на историю, пока что мок, пока что симуляция запроса
    // setTimeout(() => {
    tab === "predictions" && setHistoryList(predictionsMock);
    // tab === "transactions" && setHistoryList(transactionsMock);
    // }, 2000);
  }, [tab]);

  return (
    <div className="history">
      <div className="history__tabs">
        {/* {historyList !== false && <Filter data={historyList} />} */}

        <div className="filter">
          {filters &&
            Object.entries(filters).map(([key, value]) => (
              <div
                onClick={() => onFilterClick(key)}
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
        {filteredHistoryList
          ? filteredHistoryList.map((item) => (
              <HistoryItem
                key={item.id}
                id={item.id}
                side={item.side}
                result={item.result}
                coef={item.coef}
                bet_amount={item.bet_amount}
                result_amount={item.result_amount}
                date={item.date}
              />
            ))
          : historyList &&
            historyList.map((item) => (
              <HistoryItem
                key={item.id}
                id={item.id}
                side={item.side}
                result={item.result}
                coef={item.coef}
                bet_amount={item.bet_amount}
                result_amount={item.result_amount}
                date={item.date}
              />
            ))}
      </div>
    </div>
  );
};

export default History;
