import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

export type BetHistory = {
  user_id: string;
  balance_kind: "points" | "coin";
  bet_side_coefficient: number;
  bet_side: "up" | "down";
  bet_sum: number;
  block_num: number;
  block_hash: string;
  made_at: number;
  win_state: "won" | "lose";
  win_sum: number;
};

async function makeBet(points: number, side: "UP" | "DOWN") {
  const newSide = side.toLowerCase();

  return await api.post(`/bets/points?points=${points}&side=${newSide}`, {});
}

async function myBets(block_kind: "point_block" | "coin_block", num: number) {
  return await api.get(
    `/bets/my/latest?block_kind=${block_kind}&num=${num}`,
    {}
  );
}

async function myBetsHistory(
  num: number,
  block_kind: "point_block" | "coin_block"
) {
  return await api.get(`/bets/my`, {
    params: {
      num,
      block_kind,
    },
  });
}

async function myBetsHistoryFiltered(
  num: number,
  block_kind: "point_block" | "coin_block",
  bet_side?: "up" | "down",
  win_result?: "won" | "lose"
) {
  return await api.get(
    `/bets/my/filtered?block_kind=${block_kind}&num=${num}`,
    {
      params: {
        bet_side,
        win_result,
      },
    }
  );
}

export const betsApi = {
  makeBet,
  myBets,
  myBetsHistory,
  myBetsHistoryFiltered,
};
