import { BENEFIT_RATE } from "../../constants";
import { isExpired, isLowerMaxBenefit } from "../../helpers";

export default ({ expiresIn, benefit, name }) => {
  let newBenefit: number = benefit;

  if (isLowerMaxBenefit(benefit)) {
    newBenefit =
      benefit +
      (isExpired(expiresIn) ? BENEFIT_RATE.DOUBLE : BENEFIT_RATE.NORMAL);
  } else newBenefit = benefit;

  const newExpiresIn: number = expiresIn - 1;

  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};
