import { useState } from "react";
import Button from "../Button/Button";
import "./RefLink.scss";

interface IRefLink {
  link: string;
}

const RefLink = ({ link }: IRefLink) => {
  const [isCopied, setCopied] = useState(false);

  const onCopyClick = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <div className="ref-link">
      <p className="ref-link__link">{link}</p>
      <Button isDisabled={isCopied} onClick={onCopyClick} classname="ref-link__button" isPrimary isRounded text={isCopied ? "copied!" : "copy"} />
    </div>
  );
};

export default RefLink;
