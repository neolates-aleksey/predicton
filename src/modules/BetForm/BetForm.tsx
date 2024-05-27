import { useState } from "react";
import "./BetForm.scss";
import Button from "../../shared/components/Button/Button";

const BetForm = () => {
  const [betValue, setBetValue] = useState(0.0);

  // TODO: В глобальный стейт
  const [balance] = useState(200);

  const inputChangeValue = (e: any) => {
    const value = e.target.value;
    if (value > balance) {
      setBetValue(balance);
    }
    setBetValue(value);
  };

  return (
    <div className="bet-form">
      <input max={balance} type="number" onChange={(e) => inputChangeValue(e)} value={betValue} />
      <p>balance: ${balance}</p>
      <div className="bet-form__buttons">
        <Button classname="bet-form__button" text="UP" isGreen />
        <Button classname="bet-form__button" text="DOWN" isRed />
      </div>
    </div>
  );
};

export default BetForm;
