import { atom } from "recoil";
import { IBlock } from "../shared/components/Block/Block";

export const blocksState = atom<IBlock[] | null>({
  key: "blocksState",
  default: null,
});
