import DesktopBalance from "./DesktopBalance/DesktopBalance";
import History from "../../modules/History/History";
import { useState } from "react";
import classNames from "classnames";
import "./Account.scss";
import Settings from "../../modules/Settings/Settings";

export type TTabName = "predictions" | "transactions" | "settings";

const Account = () => {
  const [currentTab, setCurrentTab] = useState<TTabName>("predictions");

  const onTabClick = (tabName: TTabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className="account">
      <div className="account__container container">
        <div className="account__content">
          <div className="account__left">
            <DesktopBalance />
          </div>
          <div className="account__right">
            <div className="account__tabs">
              <div
                onClick={() => onTabClick("predictions")}
                className={classNames("account__tab", {
                  account__tab_active: currentTab === "predictions",
                })}
              >
                Predictions
              </div>
              <div
                onClick={() => onTabClick("settings")}
                className={classNames("account__tab", {
                  account__tab_active: currentTab === "settings",
                })}
              >
                Settings
              </div>
            </div>
            <div className="account__history">
              {currentTab === "settings" && <Settings />}
              {(currentTab === "predictions" ||
                currentTab === "transactions") && <History tab={currentTab} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
