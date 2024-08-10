import { IPrediction } from "../../../modules/History/History";
import classNames from "classnames";
import "./HistoryItem.scss";

const HistoryItem = ({
  id,
  side,
  result,
  coef,
  bet_amount,
  result_amount,
  date,
}: IPrediction) => {
  return (
    <div key={id} className="history-item">
      <div className="history-item__content">
        <div className="history-item__left">
          <p
            className={classNames("history-item__side", {
              "history-item__side_green": side === "UP",
              "history-item__side_red": side === "DOWN",
            })}
          >
            {side === "DOWN" ? "↓ DOWN" : "↑ UP"}
          </p>
          <p className="history-item__amount">
            <span className="history-item__info">Amount:</span> {bet_amount}
          </p>
          <p className="history-item__payout">
            <span className="history-item__info">Payout:</span> {coef}x
          </p>
        </div>
        <div className="history-item__right">
          <p className="history-item__status">
            {result === "LOSE" ? "FAILED :(" : "PASSED!"}
          </p>
          <p
            className={classNames("history-item__profit", {
              "history-item__profit_green": result_amount > 0,
              "history-item__profit_red": result_amount < 0,
            })}
          >
            {result_amount > 0 ? `+${result_amount}` : result_amount} POINTS
          </p>
        </div>
      </div>
      <div className="history-item__bottom">
        <p className="history-item__date">{date}</p>
        <p className="history-item__id">#{id}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
