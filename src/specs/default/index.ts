import { BENEFIT_RATE } from "../../constants";
import { UpdateBenefitFn } from "../../types";
import { isHigherMinBenefit, isExpired } from "../../helpers";

export const defaultUpdateFn: UpdateBenefitFn = ({
  expiresIn,
  benefit,
  name,
}) => {
  let newBenefit: number = benefit;

  if (isHigherMinBenefit(benefit)) {
    newBenefit =
      benefit -
      (isExpired(expiresIn) ? BENEFIT_RATE.DOUBLE : BENEFIT_RATE.NORMAL);

    if (benefit < BENEFIT_RATE.NORMAL || newBenefit < 0) {
      newBenefit = 0;
    }
  }

  const newExpiresIn: number = expiresIn - 1;
  return { benefit: Math.max(newBenefit, 0), expiresIn: newExpiresIn, name };
};
