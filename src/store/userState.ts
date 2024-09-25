import { atom } from "recoil";

export type ClaimInfo = {
  boost_enable?: boolean;
  current_points_award?: number;
  end_at?: number;
  started_at?: number;
  points_per_second?: number;
};

export type UserState = {
  message: string;
  user: {
    id?: string;
    username?: string;
    created_at?: number;
    balance?: number;
    point_balance?: number;
    points_claim_info?: ClaimInfo;
    twa_auth?: {
      id?: string;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: "ru" | "en";
    };
    referal?: {
      user_owner_id?: string;
      referal_link_code: string;
    };
  };
};

export const userState = atom<UserState | null>({
  key: "userState",
  default: null,
});
