import Table from "../../shared/components/Table/Table";
import { predictionPointsTable, referalPointsTable } from "../../shared/consts/tablesData";
import IconCoin from "../../shared/icons/IconCoin";
import "./PointsSystem.scss";

const PointsSystem = () => {
  return (
    <div className="points-system">
      <div className="points-system__block">
        <p className="points-system__title">
          <IconCoin /> Points for Predictions
        </p>
        <p className="points-system__description">
          For each bet the user receives 10 points. The bigger the prediction amount in USDT, the more points it receives
        </p>
        <Table className="points-system__table" data={predictionPointsTable} />
        <p className="points-system__hint">
          For example, if you made a prediction of 7 USDT, then no matter the outcome you will get 10 + 7.00 × 1.25 = 18.75 points in your account
        </p>
      </div>
      <div className="points-system__block">
        <p className="points-system__title">Points for Tasks</p>
        <p className="points-system__description">This displays active tasks for you. Complete them to earn more points!</p>
        <p className="points-system__hint">Points for tasks may not come immediately, so it is worth waiting a little longer</p>
      </div>
      <div className="points-system__block">
        <p className="points-system__title">Points from Frens</p>
        <p className="points-system__description">You can invite new users and get points for it. Just send them your referral link:</p>
        <Table className="points-system__table" data={referalPointsTable} />
        <p className="points-system__description">
          If a person who follows the referral link wins, you get % of his winning and points. The percent and points can increase
        </p>
      </div>
    </div>
  );
};

export default PointsSystem;
