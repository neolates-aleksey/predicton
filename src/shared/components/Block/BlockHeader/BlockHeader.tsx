import { useCallback, useEffect, useState } from "react";
import IconClock from "../../../icons/IconClock";
import IconPlay from "../../../icons/IconPlay";
import "./BlockHeader.scss";
import IconFinish from "../../../icons/IconFinish";

interface IBlockHeader {
  state: string;
  end_time: Date;
}

const BlockHeader = ({ state, end_time }: IBlockHeader) => {
  const [time, setTime] = useState(0);

  // useEffect(() => {
  // let time_left = Math.floor(end_time - Date.now() / 1000);
  // setInterval(() => {
  //   time_left = Math.floor(end_time - Date.now() / 1000);
  //   if (time_left < 0) {
  //     time_left = 0;
  //   }
  //   setTime(time_left);
  // }, 1000);
  // }, []);

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
              <span className="block-header__status-text">{time}</span>
            </span>
          </>
        )}
        {state === "on_bet" && (
          <span className="block-header__timer">
            <IconClock />
            <span className="block-header__status-text">{time}</span>
          </span>
          // <span className="block-header__status block-header__status-next">
          //   <IconPlay /> <span className="block-header__status-text">NEXT</span>
          // </span>
        )}
        {state === "ended" && (
          <span className="block-header__status block-header__status_expired">
            <IconFinish /> <span className="block-header__status-text">EXPIRED</span>
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
