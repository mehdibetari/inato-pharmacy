import { isExpired, isLowerMaxBenefit } from "../../helpers";

export default ({ expiresIn, benefit, name }) => {
  let newBenefit: number = benefit;

  if (isLowerMaxBenefit(benefit)) {
    newBenefit = benefit + 1;
    if (expiresIn < 11) {
      newBenefit = newBenefit + 1;
    }
    if (expiresIn < 6) {
      newBenefit = newBenefit + 1;
    }
  }
  if (isExpired(expiresIn)) {
    newBenefit = 0;
  }

  const newExpiresIn: number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};
