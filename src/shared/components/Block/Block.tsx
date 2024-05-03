import classNames from "classnames";
import BetForm from "../../../components/BetForm/BetForm";
import "./Block.scss";
import BlockGraphs from "./BlockGraphs/BlockGraphs";
import BlockHeader from "./BlockHeader/BlockHeader";
import BlockInfo from "./BlockInfo/BlockInfo";

export enum BlockState {
  "on_bet",
  "locked",
  "ended",
}

export interface IBlock {
  block_hash: string;
  previous_block_hash: string;
  block_started_at: Date;
  block_will_end_at: Date;
  locked_at?: Date;
  will_end_at?: Date;
  state: "on_bet" | "locked" | "ended";
  locked_price: number;
  current_price: number;
  coin: "TON";
  up_bet_sum: number;
  down_bet_sum: number;
  current_up_rate: number;
  current_down_rate: number;
}

const Block = ({
  block_hash,
  previous_block_hash,
  block_started_at,
  block_will_end_at,
  locked_at,
  state,
  current_price,
  locked_price,
  current_up_rate,
  current_down_rate,
  up_bet_sum,
  down_bet_sum,
}: IBlock) => {
  return (
    <div className="block">
      <BlockHeader state={state} />

      <div className="block__body">
        <div className="block__graphs">
          <BlockGraphs up_sum={up_bet_sum} down_sum={down_bet_sum} up_rate={current_up_rate} down_rate={current_down_rate} />
        </div>
        <div className="block__info">
          <BlockInfo />
        </div>
      </div>
    </div>
  );
};

export default Block;
