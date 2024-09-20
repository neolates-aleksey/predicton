import { atom } from "recoil";
import { BlockState } from "../shared/components/Block/Block";

export type UserBet = {
  balance_kind: "points" | "coints";
  bet_side: "up" | "down";
  bet_sum: number;
  block_hash: string;
  made_at: string;
  user_id: string;
  win_state: BlockState;
};

export const userBets = atom<UserBet[] | null>({
  key: "userBetsState",
  default: null,
});
