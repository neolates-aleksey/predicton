import { atom } from "recoil";
import { IBlock } from "../shared/components/Block/Block";

type IBlockState = {
  current: IBlock;
  next: IBlock;
};

export const blocksState = atom<IBlockState | null>({
  key: "blocksState",
  default: null,
});
