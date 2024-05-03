import IconClock from "../../../icons/IconClock";
import IconPlay from "../../../icons/IconPlay";
import "./BlockHeader.scss";

interface IBlockHeader {
  state: string;
}

const BlockHeader = ({ state }: IBlockHeader) => {
  return (
    <div className="block-header">
      <div className="block-header__left">
        {state === "locked" && (
          <>
            <span className="block-header__status block-header__status_live">
              <span className="block-header__status-live">LIVE</span>
            </span>
            <span className="block-header__timer">
              <IconClock />
              <span className="block-header__status-text">3:25</span>
            </span>
          </>
        )}
        {state === "on_bet" && (
          <span className="block-header__status block-header__status-next">
            <IconPlay /> <span className="block-header__status-text">NEXT</span>
          </span>
        )}
      </div>
      <div className="block-header__right">
        <span className="block-header__hash">#1</span>
      </div>
    </div>
  );
};

export default BlockHeader;
