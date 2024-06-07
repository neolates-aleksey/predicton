import { useState } from "react";
import IconHome from "../../shared/icons/IconHome";
import IconPerson from "../../shared/icons/IconPerson";
import IconSquares from "../../shared/icons/IconSquares";
import "./MobileNav.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState(1);

  const onLinkClick = () => {};

  return (
    <div className="mobile-nav">
      <div className="mobile-nav__links">
        <Link to="/" className={classNames("mobile-nav__link", { "mobile-nav__link_active": activeTab === 1 })}>
          <div className="mobile-nav__link-icon">
            <IconHome className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Home</p>
        </Link>
        <Link to="/points" className={classNames("mobile-nav__link", { "mobile-nav__link_active": activeTab === 2 })}>
          <div className="mobile-nav__link-icon">
            <IconSquares className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Points</p>
        </Link>
        <Link to="/account" className={classNames("mobile-nav__link", { "mobile-nav__link_active": activeTab === 3 })}>
          <div className="mobile-nav__link-icon">
            <IconPerson className="mobile-nav__link-svg" />
          </div>
          <p className="mobile-nav__link-title">Account</p>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
