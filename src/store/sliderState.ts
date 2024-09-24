import { atom } from "recoil";

type SliderState = {
  isAbleToScroll?: boolean;
};

export const sliderState = atom<SliderState | null>({
  key: "sliderState",
  default: { isAbleToScroll: true },
});
