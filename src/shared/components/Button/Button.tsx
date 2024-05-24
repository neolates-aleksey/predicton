import classNames from "classnames";
import "./Button.scss";

interface IButton {
  text: string;
  classname?: string;
  isLoading?: boolean;
  isPrimary?: boolean;
  isRed?: boolean;
  isGreen?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  onClick?: () => void | false;
}

const Button = ({ text, classname, isLoading, isPrimary, isRed, isGreen, isFullWidth, onClick, isDisabled }: IButton) => {
  return (
    <div
      onClick={onClick}
      className={classNames("button", classname, {
        button_primary: isPrimary,
        button_red: isRed,
        button_green: isGreen,
        button_disabled: isLoading || isDisabled,
        button_loading: isLoading,
        "button_full-width": isFullWidth,
      })}
    >
      {isLoading ? <div className="button__loader"></div> : text}
    </div>
  );
};

export default Button;
