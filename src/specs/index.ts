import { UpdateBenefitFn } from "../types";
import updateHerbal from "./herbal";
import updateFervex from "./fervex";
import updateDafalgan from "./dafalgan";
export * from "./default";

export const customUpdateRules: Record<string, UpdateBenefitFn> = {
  "Herbal Tea": updateHerbal,
  "Magic Pill": (drug) => drug,
  Fervex: updateFervex,
  Dafalgan: updateDafalgan,
};
