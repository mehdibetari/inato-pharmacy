import { isExpired, isHigherMinBenefit } from "../../helpers";

export default ({ expiresIn, benefit, name }) => {
  let newBenefit: number = benefit;
  if (isHigherMinBenefit(benefit)) {
    isExpired(expiresIn)
      ? (newBenefit = benefit >= 4 ? benefit - 4 : 0)
      : (newBenefit = benefit >= 2 ? benefit - 2 : 0);
  }
  const newExpiresIn: number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};
