import Button from "../../shared/components/Button/Button";
import RefLink from "../../shared/components/RefLink/RefLink";
import Table from "../../shared/components/Table/Table";
import {
  predictionPointsTable,
  referalPointsTable,
} from "../../shared/consts/tablesData";
import IconCoin from "../../shared/icons/IconCoin";
import IconPerson from "../../shared/icons/IconPerson";
import Tasks from "../Tasks/Tasks";
import "./PointsSystem.scss";

const PointsSystem = () => {
  return (
    <div className="points-system">
      <div className="points-system__block">
        <p className="points-system__title">
          <IconCoin /> Points for Predictions
        </p>
        <p className="points-system__description">
          For each bet the user receives 10 points. The bigger the prediction
          amount in USDT, the more points it receives
        </p>
        <Table className="points-system__table" data={predictionPointsTable} />
        <p className="points-system__hint">
          For example, if you made a prediction of 7 USDT, then no matter the
          outcome you will get 10 + 7.00 × 1.25 = 18.75 points in your account
        </p>
      </div>
      <div className="points-system__block">
        <p className="points-system__title">
          <IconCoin /> Points for Tasks
        </p>
        <p className="points-system__description">
          This displays active tasks for you. Complete them to earn more points!
        </p>
        <Tasks />
        <p className="points-system__hint">
          Points for tasks may not come immediately, so it is worth waiting a
          little longer
        </p>
      </div>
      <div className="points-system__block">
        <p className="points-system__title">
          <IconCoin /> Points from Frens
        </p>
        <p className="points-system__description">
          You can invite new users and get points for it. Just send them your
          referral link:
        </p>
        <RefLink link="predicton.xyz/ref/mLu52cmDv" />
        <p className="points-system__description">
          If a person who follows the referral link wins, you get % of his
          winning and points. The percent and points can increase
        </p>
        <Table
          className="points-system__table points-system__table_second"
          data={referalPointsTable}
        />
        <div className="points-system__ref">
          <div className="points-system__friends">
            <p className="points-system__friends-title">My Frens</p>

            <div className="points-system__friends-number">
              <IconPerson />

              <p className="points-system__friends-count">0</p>
            </div>
          </div>
          <div className="points-system__earnings">
            <p className="points-system__earnings-description">
              Total Earnings from Frens
            </p>
            <div className="points-system__earnings-content">
              <div className="points-system__earnings-block">
                <p className="points-system__earnings-text">0</p>
                <p className="points-system__earnings-description">USDT</p>
              </div>
              <div className="points-system__earnings-block">
                <p className="points-system__earnings-text">0</p>
                <p className="points-system__earnings-description">points</p>
              </div>
            </div>
          </div>
        </div>
        <Button isPrimary isFullWidth text="Transfer earnings" />
      </div>
    </div>
  );
};

export default PointsSystem;
