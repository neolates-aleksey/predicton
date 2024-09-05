import { atom } from "recoil";

type UserState = {
  message: string;
  user: {
    id: string;
    username: string;
    created_at: number;
    balance: 0;
    point_balance: 0;
    twa_auth: {
      id: string;
      first_name: string;
      last_name: string;
      username: string;
      language_code: "ru" | "en";
    };
  };
};

export const userState = atom<UserState | null>({
  key: "userState",
  default: null,
});
