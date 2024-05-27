import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { blocksState } from "../../store/blocks";
import { socket } from "../../api/ws";
import { blocksApi } from "../../api/blocksApi";
import CurrentBlock from "../CurrentBlock/CurrentBlock";
import NextBlock from "../NextBlock/NextBlock";
import Block, { IBlock } from "../../shared/components/Block/Block";
import "./BlocksGrid.scss";

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    className: "blocks-grid__slider",
    centerMode: true,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 784,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="blocks-grid">
      {latestsBlocks && (
        <Slider {...settings}>
          {latestsBlocks.map((item: IBlock) => (
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
          ))}
          <CurrentBlock />
          <NextBlock />
          <NextBlock />
        </Slider>
      )}
    </div>
  );
};

export default BlocksGrid;
