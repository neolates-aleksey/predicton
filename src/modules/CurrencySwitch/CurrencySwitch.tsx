import IconTonUsdt from "../../shared/icons/IconTonUsdt";
import "./CurrencySwitch.scss";

const CurrencySwitch = () => {
  return (
    <div className="currency-switch">
      <IconTonUsdt />
      <div className="currency-switch__content">
        <p className="currency-switch__name">TON/USDT</p>
        <p className="currency-switch__price">6,2637</p>
      </div>
    </div>
  );
};

export default CurrencySwitch;
