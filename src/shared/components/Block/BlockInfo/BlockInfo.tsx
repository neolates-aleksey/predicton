import classNames from "classnames";
import "./BlockInfo.scss";
import IconLock from "../../../icons/IconLock";
import IconSafe from "../../../icons/IconSafe";

interface IBlockInfo {
  last_price: number;
  locked_price: number;
  prize_pool: number;
  change: number;
}

const BlockInfo = ({
  last_price,
  locked_price,
  prize_pool,
  change,
}: IBlockInfo) => {
  return (
    <div className="block-info">
      <div className="block-info__item">
        <p className="block-info__title">Last price</p>
        <p className="block-info__text">{last_price}</p>
      </div>
      <div
        className={classNames("block-info__item", "block-info__change", {
          "block-info__change_down": change < 0,
          "block-info__change_up": change > 0,
        })}
      >
        <p
          className={classNames("block-info__change-title", {
            "block-info__change-title_white": change < 0,
          })}
        >
          Change
        </p>
        <p
          className={classNames("block-info__change-text", {
            "block-info__change-text_white": change < 0,
          })}
        >
          {change.toFixed(5)}
        </p>
      </div>
      <div className="block-info__item">
        <p className="block-info__title">
          <IconLock />
          Locked price
        </p>
        <p className="block-info__text block-info__text_small">
          {locked_price}
        </p>
      </div>
      <div className="block-info__item">
        <p className="block-info__title">
          <IconSafe />
          Prize pool
        </p>
        <p className="block-info__text block-info__text_small">{prize_pool}</p>
      </div>
    </div>
  );
};

export default BlockInfo;
