import { Drug } from "./types";
import { isExpired, isLowerMaxBenefit, isHigherMinBenefit } from "./helpers";

const HERBAL = "Herbal Tea";
const MAGIC = "Magic Pill";
const FERVEX = "Fervex";
const DAFALGAN = "Dafalgan";

const herbalUpdates = ({ expiresIn, benefit, name }) => {
  let newBenefit:number = benefit;
  isExpired(expiresIn)
    ? (newBenefit = isLowerMaxBenefit(benefit) ? benefit + 2 : benefit)
    : (newBenefit = isLowerMaxBenefit(benefit) ? benefit + 1 : benefit);
  const newExpiresIn:number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};

const fervexUpdates = ({ expiresIn, benefit, name }) => {
  let newBenefit:number = benefit;
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
  const newExpiresIn:number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};

const defaultUpdates = ({ expiresIn, benefit, name }) => {
  let newBenefit:number = benefit;
  if (isHigherMinBenefit(benefit)) {
    isExpired(expiresIn)
      ? (newBenefit = benefit >= 2
          ? benefit - 2
          : 0)
      : (newBenefit = benefit >= 1
          ? benefit - 1
          : 0)
  }
  const newExpiresIn:number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};

const dafalganUpdates = ({ expiresIn, benefit, name }) => {
  let newBenefit:number = benefit;
  if (isHigherMinBenefit(benefit)) {
    isExpired(expiresIn)
      ? (newBenefit = benefit >= 4
          ? benefit - 4
          : 0)
      : (newBenefit = benefit >= 2
          ? benefit - 2
          : 0)
  }
  const newExpiresIn:number = expiresIn - 1;
  return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};

export const updateBenefitValue = (drugs: Array<Drug>) => {
  //todo : dont rewrite input
  // todo move to functionnal loop
  for (var i = 0; i < drugs.length; i++) {
    switch (drugs[i].name) {
      case HERBAL:
        drugs[i] = herbalUpdates(drugs[i]);
        break;
      case FERVEX:
        drugs[i] = fervexUpdates(drugs[i]);
        break;
      case DAFALGAN:
        drugs[i] = dafalganUpdates(drugs[i]);
        break;
      case MAGIC:
        break;
      default:
        drugs[i] = defaultUpdates(drugs[i]);
        break;
    }
  }
  return drugs;
};
