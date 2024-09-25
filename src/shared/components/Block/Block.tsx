import classNames from "classnames";
import BlockGraphs from "./BlockGraphs/BlockGraphs";
import BlockHeader from "./BlockHeader/BlockHeader";
import BlockInfo from "./BlockInfo/BlockInfo";
import IconArrowDown from "../../icons/IconArrowDown";
import IconArrowUp from "../../icons/IconArrowUp";
import { useEffect, useState } from "react";
import BlockBet from "./BlockBet/BlockBet";
import useDelayUnmount from "../../helpers/useDelayUnmount";
import { useRecoilState } from "recoil";
import { UserBet, userBets } from "../../../store/userBets";
import "./Block.scss";
import { sliderState } from "../../../store/sliderState";

export type BlockState =
  | "on_bet"
  | "locked"
  | "ended"
  | "wait_for_bet"
  | "later";

export interface IBlock {
  block_hash: string;
  block_num: number;
  bet_started_at: Date;
  block_kind: "point_block" | "coin_block";
  state: BlockState;
  created_at: number;

  current_down_rate: number;
  current_price: number;
  current_up_rate: number;

  up_bet_sum: number;
  down_bet_sum: number;

  total_users_bet_down: number;
  total_users_bet_up: number;

  will_end_at: number | null;
  bet_will_end_at: number;
  locked_at: number | null;

  is_genesis: boolean;
  locked_price: number;
  coin: "TON";

  winning_side: string | null;

  later?: {
    next_state: BlockState;
    will_end_at: number | null;
    next_block_number: number;
    timer?: string | number;
  };
}

const Block = ({
  block_num,
  block_hash,
  state,
  current_price,
  will_end_at,
  locked_price,
  current_up_rate,
  total_users_bet_up,
  total_users_bet_down,
  current_down_rate,
  up_bet_sum,
  down_bet_sum,
  winning_side,
  later,
}: IBlock) => {
  const [betsInfo] = useRecoilState(userBets);
  const [, setSliderInfo] = useRecoilState(sliderState);
  const [blockBet, setBlockBet] = useState<UserBet | null>(null);
  const [controlOpen, setControlOpen] = useState<false | "UP" | "DOWN">(false);

  const [isMounted, setIsMounted] = useState(false);
  const shouldRenderChild = useDelayUnmount(isMounted, 200);

  const onBetOpen = (side: "UP" | "DOWN") => {
    setIsMounted(true);
    setControlOpen(side);
    setSliderInfo({ isAbleToScroll: false });
  };

  const onBetClose = () => {
    setIsMounted(false);
    setControlOpen(false);
    setSliderInfo({ isAbleToScroll: true });
  };

  useEffect(() => {
    betsInfo &&
      betsInfo?.forEach((bet) => {
        bet.block_hash === block_hash && setBlockBet(bet);
      });
  }, [betsInfo]);

  return (
    <div className={classNames("block", { block_ended: state === "ended" })}>
      <BlockHeader
        block_num={
          later?.next_block_number ? later.next_block_number + 1 : block_num
        }
        state={state}
        end_time={will_end_at ? will_end_at : 0}
      />

      <div
        className={classNames("block__body", {
          block__body_red: locked_price > current_price && locked_price,
          block__body_green: locked_price < current_price && locked_price,
        })}
      >
        <div className="block__graphs">
          <BlockGraphs
            up_sum={up_bet_sum}
            down_sum={down_bet_sum}
            up_rate={current_up_rate}
            down_rate={current_down_rate}
            blockState={state}
            users_down={total_users_bet_down}
            users_up={total_users_bet_up}
          />
        </div>
        <div className="block__info">
          {state === "on_bet" || state === "wait_for_bet" ? (
            <div className="block__prediction">
              {blockBet ? (
                <div className="block__noted">
                  <p className="block__noted-title">
                    Your Prediction is Noted!
                  </p>
                  <p className="block__noted-text">
                    Waiting for other users predictions...
                  </p>
                </div>
              ) : (
                <>
                  <p className="block__prediction-title">
                    Make Your Prediction
                  </p>
                  <div className="block__prediction-buttons">
                    <div
                      onClick={() => onBetOpen("DOWN")}
                      className="block__prediction-button block__prediction-button_red"
                    >
                      <IconArrowUp color="white" />
                      DOWN
                    </div>
                    <div
                      onClick={() => onBetOpen("UP")}
                      className="block__prediction-button block__prediction-button_green"
                    >
                      <IconArrowDown color="black" />
                      UP
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <BlockInfo
              last_price={current_price}
              locked_price={locked_price}
              prize_pool={up_bet_sum + down_bet_sum}
              change={current_price - locked_price}
            />
          )}
        </div>

        {shouldRenderChild && (
          <BlockBet
            className={classNames(
              isMounted ? "mountedStyle" : "unmountedStyle"
            )}
            side={controlOpen}
            closeHandler={onBetClose}
          />
        )}

        {state === "later" && (
          <div className="block__later">
            {later?.next_state === "wait_for_bet" && (
              <div className="block__later-content">
                <p className="block__later-title">Waiting for bets</p>
                <p className="block__later-text">
                  Block will restart after both sides make their bets
                </p>
              </div>
            )}
            {later?.timer && (
              <span className="block__later-timer">{later.timer}</span>
            )}
          </div>
        )}
      </div>

      {blockBet && (
        <div className="block__bet">
          <p className="block__bet-info">
            {state && (
              <>
                Prediction:{" "}
                <span
                  className={classNames("block__bet-side", {
                    "block__bet-side_up": blockBet.bet_side === "up",
                    "block__bet-side_down": blockBet.bet_side === "down",
                  })}
                >
                  {blockBet.bet_side.toUpperCase()}
                </span>
              </>
            )}
          </p>
          <p
            className={classNames("block__bet-count", {
              "block__bet-count_up":
                blockBet.bet_side === winning_side && state === "ended",
              "block__bet-count_down":
                blockBet.bet_side !== winning_side && state === "ended",
            })}
          >
            {winning_side !== null && state === "ended" && (
              <>{blockBet.bet_side === winning_side ? "+" : "-"}</>
            )}
            {blockBet.bet_sum} POINTS
          </p>
        </div>
      )}
    </div>
  );
};

export default Block;
