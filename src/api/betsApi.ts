import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

async function makeBet(points: number, side: "UP" | "DOWN") {
  const newSide = side.toLowerCase();

  return await api.post(`/bets/points?points=${points}&side=${newSide}`, {});
}

export const betsApi = {
  makeBet,
};
