import { DrugProps } from './types';

export const updateBenefitValue = (drugs: Array<DrugProps>) => {
  //todo : dont rewrite input
  //todo : refactor to functionnal approch
  //todo : add typing
  const MAX_BENEFIT = 50;
  const MIN_BENEFIT = 0;
  const HERBAL = "Herbal Tea";
  const MAGIC = "Magic Pill";
  const FERVEX = "Fervex";

  for (var i = 0; i < drugs.length; i++) {
    const isNotDecreasableDrug = drugs[i].name != HERBAL && drugs[i].name != FERVEX;
    const isHigherMinBenefit = drugs[i].benefit > MIN_BENEFIT;
    const isLowerMaxBenefit = drugs[i].benefit < MAX_BENEFIT;
    if (isNotDecreasableDrug) {
      if (isHigherMinBenefit) {
        if (drugs[i].name != MAGIC) {
          drugs[i].benefit = drugs[i].benefit - 1;
        }
      }
    } else {
      if (isLowerMaxBenefit) {
        drugs[i].benefit = drugs[i].benefit + 1;
        if (drugs[i].name == FERVEX) {
          if (drugs[i].expiresIn < 11) {
            if (isLowerMaxBenefit) {
              drugs[i].benefit = drugs[i].benefit + 1;
            }
          }
          if (drugs[i].expiresIn < 6) {
            if (isLowerMaxBenefit) {
              drugs[i].benefit = drugs[i].benefit + 1;
            }
          }
        }
      }
    }
    if (drugs[i].name != MAGIC) {
      drugs[i].expiresIn = drugs[i].expiresIn - 1;
    }
    if (drugs[i].expiresIn < 0) {
      if (drugs[i].name != HERBAL) {
        if (drugs[i].name != FERVEX) {
          if (isHigherMinBenefit) {
            if (drugs[i].name != MAGIC) {
              drugs[i].benefit = drugs[i].benefit - 1;
            }
          }
        } else {
          drugs[i].benefit = drugs[i].benefit - drugs[i].benefit;
        }
      } else {
        if (isLowerMaxBenefit) {
          drugs[i].benefit = drugs[i].benefit + 1;
        }
      }
    }
  }

  return drugs;
}
