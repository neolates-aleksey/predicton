import { IBlock } from "../components/Block/Block";

export const mockedBlocks: IBlock[] = [
  {
    block_hash: "2",
    previous_block_hash: "1",
    block_started_at: new Date(),
    block_will_end_at: new Date(),
    locked_at: new Date(),
    will_end_at: new Date(),
    state: "locked",
    locked_price: 4.5,
    current_price: 4.46,
    coin: "TON",
    up_bet_sum: 3,
    down_bet_sum: 1.7,
    current_up_rate: 1.4,
    current_down_rate: 2.2,
  },
];
