import { BENEFIT_RATE } from "../../constants";
import { isExpired, isHigherMinBenefit } from "../../helpers";

export default ({ expiresIn, benefit, name }) => {
  let newBenefit: number = benefit;

  if (isHigherMinBenefit(benefit)) {
    newBenefit =
      benefit -
      (isExpired(expiresIn) ? BENEFIT_RATE.QUADRUPLE : BENEFIT_RATE.DOUBLE);

    if (benefit < BENEFIT_RATE.DOUBLE || newBenefit < 0) {
      newBenefit = 0;
    }
  }

  const newExpiresIn: number = expiresIn - 1;
  return { benefit: Math.max(newBenefit, 0), expiresIn: newExpiresIn, name };
};
