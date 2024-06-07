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
  isRounded?: boolean;
  onClick?: () => void | false;
}

const Button = ({ text, classname, isLoading, isPrimary, isRed, isGreen, isFullWidth, onClick, isDisabled, isRounded }: IButton) => {
  return (
    <div
      onClick={onClick}
      className={classNames("button", classname, {
        button_primary: isPrimary,
        button_red: isRed,
        button_green: isGreen,
        button_disabled: isDisabled,
        button_loading: isLoading,
        button_rounded: isRounded,
        "button_full-width": isFullWidth,
      })}
    >
      {isLoading ? <div className="button__loader"></div> : text}
    </div>
  );
};

export default Button;
