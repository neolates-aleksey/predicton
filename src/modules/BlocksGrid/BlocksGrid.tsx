import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { blocksState } from "../../store/blocks";
import { blocksApi } from "../../api/blocksApi";
import CurrentBlock from "../CurrentBlock/CurrentBlock";
import NextBlock from "../NextBlock/NextBlock";
import Block, { IBlock } from "../../shared/components/Block/Block";
import { socket } from "../../api/config";
import "swiper/css";
import { betsApi } from "../../api/betsApi";
import { userBets } from "../../store/userBets";
import ContentLoader from "react-content-loader";
import BlockLater from "./BlockLater/BlockLater";
import "./BlocksGrid.scss";
import { sliderState } from "../../store/sliderState";

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
        centerPadding: "46px",
        slidesToShow: 1,
        centerMode: true,
      },
    },
  ],
};

const BlocksGrid = () => {
  const [blocksData, setBlocksData] = useRecoilState(blocksState);
  const [sliderInfo] = useRecoilState(sliderState);
  const [, setBetsInfo] = useRecoilState(userBets);
  const [latestsBlocks, setLatestsBlocks] = useState<IBlock[]>();
  const [isLoading, setIsLoading] = useState(true);

  let sliderRef = useRef(null);

  useEffect(() => {
    blocksApi.getBlocks(4, "point_block").then((res) => {
      const endedBlocks: IBlock[] = [];

      res.data.forEach((block: IBlock) => {
        block.state === "ended" && endedBlocks.push(block);
      });

      setLatestsBlocks(endedBlocks);
    });

    socket.onmessage = function (event) {
      const block = JSON.parse(event.data);
      console.log(block);
      setBlocksData(block);
    };

    betsApi.myBets("point_block", 5).then((res) => {
      setBetsInfo(res.data);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      blocksData &&
        latestsBlocks &&
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
    }
  }, [latestsBlocks, blocksData]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     sliderRef && sliderRef.current.slickGoTo(1);
  //   }, 300);
  // }, [sliderRef]);

  return (
    <div className="blocks-grid">
      {!isLoading ? (
        <Slider
          touchMove={sliderInfo?.isAbleToScroll}
          ref={sliderRef}
          {...settings}
        >
          {latestsBlocks &&
            latestsBlocks
              .map((item: IBlock) => (
                <Block
                  key={item.block_hash}
                  block_hash={item.block_hash}
                  block_num={item.block_num}
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
                  total_users_bet_down={item.total_users_bet_down}
                  total_users_bet_up={item.total_users_bet_up}
                />
              ))
              .reverse()}

          {blocksData?.current && <CurrentBlock />}
          {blocksData?.next && <NextBlock />}
          {blocksData?.next && (
            <BlockLater
              next_block_state={blocksData?.next.state}
              next_block_end={blocksData.next.bet_will_end_at}
              next_block_number={blocksData.next.block_num}
            />
          )}
        </Slider>
      ) : (
        <div className="blocks-grid__loader">
          <ContentLoader
            className="blocks-grid__loader-main"
            speed={2}
            width={294}
            height={336}
            viewBox="0 0 294 336"
            backgroundColor="#20303F"
            foregroundColor="#324353"
          >
            <rect x="3" y="0" rx="16" ry="16" width="294" height="336" />
          </ContentLoader>

          <div className="blocks-grid__loader-right"></div>
          <div className="blocks-grid__loader-left"></div>
        </div>
      )}
    </div>
  );
};

export default BlocksGrid;
