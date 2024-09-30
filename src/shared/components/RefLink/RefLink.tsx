import Button from "../Button/Button";
import "./RefLink.scss";
import { initUtils } from "@telegram-apps/sdk";

interface IRefLink {
  link: string | undefined;
}

const RefLink = ({ link }: IRefLink) => {
  const utils = initUtils();

  return (
    <div className="ref-link">
      <p className="ref-link__link">
        https://t.me/PredictonAppBot/Prediction/startapp={link}
      </p>
      <Button
        onClick={() =>
          utils.shareURL(
            `https://t.me/PredictonAppBot/Prediction?startapp=${link}`
          )
        }
        classname="ref-link__button"
        isPrimary
        isRounded
        text="share"
      />
    </div>
  );
};

export default RefLink;
