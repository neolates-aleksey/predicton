import classNames from "classnames";
import "./HistoryItem.scss";
import { BetHistory } from "../../../api/betsApi";
import { timestampToDate } from "../../helpers/timestampToDate";

type Props = {
  bet: BetHistory;
};

const HistoryItem = ({ bet }: Props) => {
  return (
    <div key={bet.made_at} className="history-item">
      <div className="history-item__content">
        <div className="history-item__left">
          <p
            className={classNames("history-item__side", {
              "history-item__side_green": bet.bet_side === "up",
              "history-item__side_red": bet.bet_side === "down",
            })}
          >
            {bet.bet_side === "down" ? "↓ DOWN" : "↑ UP"}
          </p>
          <p className="history-item__amount">
            <span className="history-item__info">Amount:</span> {bet.bet_sum}{" "}
            {bet.balance_kind}
          </p>
          <p className="history-item__payout">
            {/* TODO: coef */}
            <span className="history-item__info">Payout:</span>{" "}
            {bet.bet_side_coefficient}x
          </p>
        </div>
        <div className="history-item__right">
          <p className="history-item__status">
            {bet.win_state === "lose" ? "LOOSE :(" : "WON!"}
          </p>
          {/* TODO: результат выигрыша */}
          <p
            className={classNames("history-item__profit", {
              "history-item__profit_green": bet.win_sum > 0,
              "history-item__profit_red": bet.win_sum < 0,
            })}
          >
            {bet.win_sum > 0 ? `+${bet.win_sum}` : bet.win_sum} POINTS
          </p>
        </div>
      </div>
      <div className="history-item__bottom">
        <p className="history-item__date">{timestampToDate(bet.made_at)}</p>

        {/* TODO: block_num */}
        <p className="history-item__id">#{bet.block_num}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
