import { isExpired, isLowerMaxBenefit } from "../../helpers";

export default ({ expiresIn, benefit, name }) => {
  let newBenefit: number = benefit;

  isExpired(expiresIn)
    ? (newBenefit = isLowerMaxBenefit(benefit) ? benefit + 2 : benefit)
    : (newBenefit = isLowerMaxBenefit(benefit) ? benefit + 1 : benefit);
  const newExpiresIn: number = expiresIn - 1;

  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};
