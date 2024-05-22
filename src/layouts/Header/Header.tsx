import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import Button from "../../shared/components/Button/Button";
import "./Header.scss";

const Header = () => {
  // const wallet = useTonWallet();

  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__body">
          <div className="header__logo">LOGO</div>
          <div className="header__options">
            <div className="header__connect">{/* <TonConnectButton /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
