import { BlockState, IBlock } from "../components/Block/Block";

export const blocksMocks: IBlock[] = [
  {
    block_hash: "123",
    block_num: 1,
    previous_block_hash: "122",
    bet_started_at: new Date(),
    bet_will_end_at: 12,
    will_end_at: 12,
    locked_at: 12,
    state: "on_bet",
    locked_price: 2.6,
    current_price: 2.6,
    coin: "TON",
    up_bet_sum: 20,
    down_bet_sum: 10,
    current_up_rate: 1.4,
    current_down_rate: 2,
  },
];
