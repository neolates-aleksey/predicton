import React from "react";
import { mockedBlocks } from "../../shared/consts/mockData";
import Block, { IBlock } from "../../shared/components/Block/Block";
import "./BlocksGrid.scss";

const BlocksGrid = () => {
  return (
    <div className="blocks-grid">
      {mockedBlocks.map((block: IBlock) => (
        <Block
          key={block.block_hash}
          block_hash={block.block_hash}
          previous_block_hash={block.previous_block_hash}
          block_started_at={block.block_started_at}
          block_will_end_at={block?.will_end_at}
          locked_at={block.locked_at}
          state={block.state}
          locked_price={block.locked_price}
          current_price={block.current_price}
          coin={block.coin}
          up_bet_sum={block.up_bet_sum}
          down_bet_sum={block.down_bet_sum}
          current_up_rate={block.current_up_rate}
          current_down_rate={block.current_down_rate}
        />
      ))}
    </div>
  );
};

export default BlocksGrid;
