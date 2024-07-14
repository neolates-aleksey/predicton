import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import IconHome from "../../shared/icons/IconHome";
import IconPerson from "../../shared/icons/IconPerson";
import IconSquares from "../../shared/icons/IconSquares";
import "./MobileNav.scss";

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [isVisible, setVisible] = useState<boolean>();
  const navigate = useNavigate();

  const onLinkClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    tabNumber === 1 && navigate("/");
    tabNumber === 2 && navigate("/points");
    tabNumber === 3 && navigate("/account");
  };

  useEffect(() => {
    window.location.pathname === "/onboarding"
      ? setVisible(false)
      : setVisible(true);
  }, [window.location.pathname]);

  return (
    <div
      className={classNames("mobile-nav", { "mobile-nav_hidden": !isVisible })}
    >
      <div className="mobile-nav__links">
        <div
          onClick={() => onLinkClick(1)}
          className={classNames("mobile-nav__link", {
            "mobile-nav__link_active": activeTab === 1,
          })}
        >
          <div className="mobile-nav__link-icon">
            <IconHome className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Home</p>
        </div>
        <div
          onClick={() => onLinkClick(2)}
          className={classNames("mobile-nav__link", {
            "mobile-nav__link_active": activeTab === 2,
          })}
        >
          <div className="mobile-nav__link-icon">
            <IconSquares className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Points</p>
        </div>
        <div
          onClick={() => onLinkClick(3)}
          className={classNames("mobile-nav__link", {
            "mobile-nav__link_active": activeTab === 3,
          })}
        >
          <div className="mobile-nav__link-icon">
            <IconPerson className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Account</p>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
