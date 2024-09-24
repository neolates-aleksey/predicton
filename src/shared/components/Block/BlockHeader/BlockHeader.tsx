import { useCallback, useEffect, useState } from "react";
import IconClock from "../../../icons/IconClock";
import IconPlay from "../../../icons/IconPlay";
import "./BlockHeader.scss";
import IconFinish from "../../../icons/IconFinish";
import { formatTimeUntil } from "../../../helpers/formatTimeUntil";
import { BlockState } from "../Block";

interface IBlockHeader {
  state: BlockState;
  end_time: number;
  block_num?: number;
}

const BlockHeader = ({ state, end_time, block_num }: IBlockHeader) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  const formatTime = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = String(minutes).padStart(2, "0");
    const formattedSeconds: string = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    let intervalId = null;

    if (state === "locked") {
      const calculateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remaining = end_time - currentTime;

        setSecondsRemaining(Math.max(remaining, 0));
      };

      calculateRemainingTime();

      intervalId = setInterval(calculateRemainingTime, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [end_time]);

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
              <span className="block-header__status-text">
                {formatTime(secondsRemaining)}
              </span>
            </span>
          </>
        )}
        {(state === "on_bet" || state === "wait_for_bet") && (
          <>
            <span className="block-header__status block-header__status-next">
              <IconPlay />{" "}
              <span className="block-header__status-text">NEXT</span>
            </span>
          </>
        )}
        {state === "ended" && (
          <span className="block-header__status block-header__status_expired">
            <IconFinish />{" "}
            <span className="block-header__status-text">EXPIRED</span>
          </span>
        )}
        {state === "later" && (
          <span className="block-header__status block-header__status_expired">
            <IconPlay />{" "}
            <span className="block-header__status-text">LATER</span>
          </span>
        )}
      </div>
      <div className="block-header__right">
        <span className="block-header__hash">#{block_num && block_num}</span>
      </div>
    </div>
  );
};

export default BlockHeader;
