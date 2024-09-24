import { useEffect, useState } from "react";
import Block, { BlockState } from "../../../shared/components/Block/Block";
import { blocksMocks } from "../../../shared/mocks/blocksMocks";
import "./BlockLater.scss";

type Props = {
  next_block_state: BlockState;
  next_block_end: number | null;
  next_block_number: number;
};

const BlockLater = (info: Props) => {
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

    if (info.next_block_state === "on_bet") {
      const calculateRemainingTime = () => {
        if (info.next_block_end) {
          const currentTime = Math.floor(Date.now() / 1000);
          const remaining = info.next_block_end - currentTime;

          setSecondsRemaining(Math.max(remaining, 0));
        }
      };

      calculateRemainingTime();

      intervalId = setInterval(calculateRemainingTime, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [info]);

  return (
    <div className="block-later">
      {blocksMocks && (
        <Block
          key={blocksMocks[0].block_hash}
          block_num={blocksMocks[0].block_num}
          block_hash={blocksMocks[0].block_hash}
          block_kind={"point_block"}
          created_at={1}
          is_genesis={false}
          winning_side={""}
          bet_started_at={blocksMocks[0].bet_started_at}
          bet_will_end_at={blocksMocks[0].bet_will_end_at}
          will_end_at={blocksMocks[0].will_end_at}
          locked_at={blocksMocks[0].locked_at}
          state={"later"}
          locked_price={blocksMocks[0].locked_price}
          current_price={blocksMocks[0].current_price}
          coin={blocksMocks[0].coin}
          up_bet_sum={blocksMocks[0].up_bet_sum}
          down_bet_sum={blocksMocks[0].down_bet_sum}
          current_up_rate={blocksMocks[0].current_up_rate}
          current_down_rate={blocksMocks[0].current_down_rate}
          later={{
            next_state: info.next_block_state,
            will_end_at: info.next_block_end,
            next_block_number: info.next_block_number,
            timer: secondsRemaining && formatTime(secondsRemaining),
          }}
        />
      )}
    </div>
  );
};

export default BlockLater;
