import { atom } from "recoil";

type LaunchState = {
  isFirstLaunch?: boolean;
  isDevMode?: boolean;
  isLoading?: boolean;
};

export const launchState = atom<LaunchState | null>({
  key: "launchState",
  default: { isLoading: true, isDevMode: false },
});
