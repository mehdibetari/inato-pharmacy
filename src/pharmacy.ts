import { Drug } from "./types";
import { customUpdateRules, defaultUpdateFn } from "./specs";

export const updateBenefitValue = (drug: Drug) => {
  const { name } = drug;

  return customUpdateRules[name]
    ? customUpdateRules[name](drug)
    : defaultUpdateFn(drug);
};
