import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

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

export const betsApi = {
  makeBet,
  myBets,
};
