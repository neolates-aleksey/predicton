import { atom } from "recoil";
import { IBlock } from "../shared/components/Block/Block";

// type TBlocksData = {
//   id?: string | null;
//   token: string | null;
//   refreshToken: string | null;
//   phone: string | null;
//   isAdmin?: boolean;
//   isUser?: boolean;
// };

export const blocksState = atom<IBlock[] | null>({
  key: "blocksState",
  default: null,
});
