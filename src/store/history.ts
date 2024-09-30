import { atom } from "recoil";
import { BetHistory } from "../api/betsApi";

export type TPointsHistoryList = {
  all: BetHistory[];
  loose: BetHistory[];
  win: BetHistory[];
  up: BetHistory[];
  down: BetHistory[];
};

export type THistoryTotal = {
  [K in keyof TPointsHistoryList]: number;
};

export type IPointsHistory = {
  total: THistoryTotal;
  bets: TPointsHistoryList;
};

export const pointsHistoryState = atom<IPointsHistory | null>({
  key: "pointsHistoryState",
  default: null,
});
