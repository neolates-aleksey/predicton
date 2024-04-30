import { useState, useEffect } from "react";
import Block, { IBlock } from "../../shared/components/Block/Block";
import { mockedBlocks } from "../../shared/consts/mockData";

const NextBlock = () => {
  const [blockInfo, setBlockInfo] = useState<IBlock | null>(null);

  useEffect(() => {
    setBlockInfo(mockedBlocks[1]);
  }, []);

  return (
    <>
      {blockInfo && (
        <Block
          key={blockInfo.block_hash}
          block_hash={blockInfo.block_hash}
          previous_block_hash={blockInfo.previous_block_hash}
          block_started_at={blockInfo.block_started_at}
          block_will_end_at={blockInfo.block_will_end_at}
          will_end_at={blockInfo.will_end_at}
          locked_at={blockInfo.locked_at}
          state={blockInfo.state}
          locked_price={blockInfo.locked_price}
          current_price={blockInfo.current_price}
          coin={blockInfo.coin}
          up_bet_sum={blockInfo.up_bet_sum}
          down_bet_sum={blockInfo.down_bet_sum}
          current_up_rate={blockInfo.current_up_rate}
          current_down_rate={blockInfo.current_down_rate}
        />
      )}
    </>
  );
};

export default NextBlock;
