import { Link } from "react-router-dom";
import "./TooltipContent.scss";

interface ITooltipContent {
  items: ITooltipItem[];
  onClose: any;
}

interface ITooltipItem {
  text: string;
  icon: any;
  link: string;
}

const TooltipContent = ({ items, onClose }: ITooltipContent) => {
  return (
    <div className="tooltip-content">
      {items ? (
        items.map((item: ITooltipItem) => (
          <Link key={item.text} to={item.link} onClick={onClose} className="tooltip-content__item">
            <p>{item.text}</p>
            {item.icon}
          </Link>
        ))
      ) : (
        <h1>error</h1>
      )}
    </div>
  );
};

export default TooltipContent;
