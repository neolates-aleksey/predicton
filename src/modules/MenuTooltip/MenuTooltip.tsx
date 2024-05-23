import { useState } from "react";
import classNames from "classnames";
import IconArrowMenu from "../../shared/icons/IconArrowMenu";
import TooltipContent from "../../shared/components/TooltipContent/TooltipContent";
import IconSquares from "../../shared/icons/IconSquares";
import IconPerson from "../../shared/icons/IconPerson";
import { addressToShort } from "../../shared/helpers/addressToShort";
import { useTonAddress } from "@tonconnect/ui-react";
import "./MenuTooltip.scss";

const MenuTooltip = () => {
  const [isOpened, setOpened] = useState(false);
  const userFriendlyAddress = useTonAddress();

  const onOpenerClick = () => {
    setOpened(!isOpened);
  };

  const panelItems = [
    {
      text: "Points",
      icon: <IconSquares />,
      link: "/points",
    },
    {
      text: "Account",
      icon: <IconPerson />,
      link: "/account",
    },
  ];

  return (
    <div className="menu-tooltip">
      <div className="menu-tooltip__content">
        <div className="menu-tooltip__info">
          <p className="menu-tooltip__info-text">Wallet</p>
          <p className="menu-tooltip__info-address">{addressToShort(userFriendlyAddress)}</p>
        </div>
        <div onClick={onOpenerClick} className="menu-tooltip__opener">
          <IconArrowMenu className={classNames("menu-tooltip__opener-arrow", { "menu-tooltip__opener-arrow_rotated": isOpened })} />
        </div>
      </div>

      {isOpened && <TooltipContent onClose={onOpenerClick} items={panelItems} />}
    </div>
  );
};

export default MenuTooltip;
