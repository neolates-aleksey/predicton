import classNames from "classnames";
import "./Button.scss";

interface IButton {
  text: string;
  classname?: string;
  isRed?: boolean;
  isGreen?: boolean;
  isFullWidth?: boolean;
}

const Button = ({ text, classname, isRed, isGreen, isFullWidth }: IButton) => {
  return (
    <div className={classNames("button", classname, { button_red: isRed, button_green: isGreen, "button_full-width": isFullWidth })}>{text}</div>
  );
};

export default Button;
