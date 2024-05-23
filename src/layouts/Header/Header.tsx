import { useEffect } from "react";
import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import IconLogo from "../../shared/icons/IconLogo";
import MenuTooltip from "../../modules/MenuTooltip/MenuTooltip";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const userFriendlyAddress = useTonAddress();

  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__body">
          <Link to="/" className="header__logo">
            <IconLogo />
          </Link>
          <div className="header__options">
            <div className="header__connect">
              {userFriendlyAddress ? (
                <>
                  <div className="header__balance">
                    <p className="header__balance-text">Balance</p>
                    <p className="header__balance-number">0.0 USDT</p>
                  </div>
                  <MenuTooltip />
                </>
              ) : (
                <TonConnectButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
