import DesktopBalance from "./DesktopBalance/DesktopBalance";
import "./Account.scss";

const Account = () => {
  return (
    <div className="account">
      <div className="account__container container">
        <div className="account__content">
          <div className="account__left">
            <DesktopBalance />
          </div>
          <div className="account__right"></div>
        </div>
      </div>
    </div>
  );
};

export default Account;
