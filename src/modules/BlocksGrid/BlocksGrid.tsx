import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { blocksState } from "../../store/blocks";
import CurrentBlock from "../CurrentBlock/CurrentBlock";
import NextBlock from "../NextBlock/NextBlock";
import { socket } from "../../api/ws";
import "./BlocksGrid.scss";
import { blocksApi } from "../../api/blocksApi";
import Block, { IBlock } from "../../shared/components/Block/Block";

const BlocksGrid = () => {
  const [blocksData, setBlocksData] = useRecoilState(blocksState);
  const [latestsBlocks, setLatestsBlocks] = useState<IBlock[]>();

  useEffect(() => {
    blocksApi.getLatestBlocks(3).then((data) => {
      console.log(data.data);

      setLatestsBlocks(data.data);
    });

    socket.onmessage = function (event) {
      const block = JSON.parse(event.data);

      setBlocksData(block);
    };
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    // centerMode: true,
    focusOnSelect: true,
    className: "blocks-grid__slider",
    centerMode: true,
    initialSlide: 2,
  };

  return (
    <div className="blocks-grid">
      <Slider {...settings}>
        {latestsBlocks &&
          latestsBlocks.map((item: IBlock) => (
            <>
              <Block
                key={item.block_hash}
                block_hash={item.block_hash}
                previous_block_hash={item.previous_block_hash}
                bet_started_at={item.bet_started_at}
                bet_will_end_at={item.bet_will_end_at}
                will_end_at={item.will_end_at}
                locked_at={item.locked_at}
                state={item.state}
                locked_price={item.locked_price}
                current_price={item.current_price}
                coin={item.coin}
                up_bet_sum={item.up_bet_sum}
                down_bet_sum={item.down_bet_sum}
                current_up_rate={item.current_up_rate}
                current_down_rate={item.current_down_rate}
              />
            </>
          ))}
        <CurrentBlock />
        <NextBlock />
      </Slider>
    </div>
  );
};

export default BlocksGrid;
