import React, { useEffect, useState } from "react";
import { TTabName } from "../../pages/Account/Account";
import {
  predictionsMock,
  transactionsMock,
} from "../../shared/mocks/historyMocks";
import "./History.scss";
import classNames from "classnames";

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
  date: Date;
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
  fail: number;
  pass: number;
};

const Filter = ({ data }: { data: IPrediction[] | ITransaction[] }) => {
  const [filters, setFilters] = useState<
    PredictionFilter | TransactionFilter | null
  >(null);

  const [activeFilter, setActiveFilter] = useState<any>();

  useEffect(() => {
    if ((data as IPrediction[])[0] && (data as IPrediction[])[0].side) {
      const predictionData = data as IPrediction[];
      const predictionFilters: PredictionFilter = {
        all: predictionData.length,
        up: predictionData.filter((pred) => pred.side === "UP").length,
        down: predictionData.filter((pred) => pred.side === "DOWN").length,
        fail: predictionData.filter((pred) => pred.result === "LOSE").length,
        pass: predictionData.filter((pred) => pred.result === "WIN").length,
      };
      setFilters(predictionFilters);
      setActiveFilter(predictionFilters.all);
    } else if (
      (data as ITransaction[])[0] &&
      (data as ITransaction[])[0].type
    ) {
      const transactionData = data as ITransaction[];
      const transactionFilters = {
        all: transactionData.length,
        deposit: transactionData.filter((trans) => trans.type === "DEPOSIT")
          .length,
        withdraw: transactionData.filter((trans) => trans.type === "WITHDRAW")
          .length,
      };
      setFilters(transactionFilters);
      setActiveFilter(transactionFilters.all);
    }
  }, [data]);

  const onFilterClick = (key: string) => {
    setActiveFilter(key);
  };

  return (
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
  );
};

const History = ({ tab }: HistoryProps) => {
  const [historyList, setHistoryList] = useState<
    IPrediction[] | ITransaction[] | false
  >(false);

  useEffect(() => {
    // TODO: fetch с параметром на историю, пока что мок, пока что симуляция запроса
    // setTimeout(() => {
    tab === "predictions" && setHistoryList(predictionsMock);
    tab === "transactions" && setHistoryList(transactionsMock);
    // }, 2000);
  }, [tab]);

  return (
    <div className="history">
      <div className="history__tabs">
        {historyList !== false && <Filter data={historyList} />}
        <div className="history__tab">
          <div className="history__tab-name">All</div>
          <div className="history__tab-number">66</div>
        </div>
      </div>
    </div>
  );
};

export default History;
