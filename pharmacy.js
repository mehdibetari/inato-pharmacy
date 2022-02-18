export const updateBenefitValue = (drugs) => {
  //todo : dont rewrite input
  //todo : refactor to functionnal approch
  //todo : add typing
  for (var i = 0; i < drugs.length; i++) {
    if (drugs[i].name != "Herbal Tea" && drugs[i].name != "Fervex") {
      if (drugs[i].benefit > 0) {
        if (drugs[i].name != "Magic Pill") {
          drugs[i].benefit = drugs[i].benefit - 1;
        }
      }
    } else {
      if (drugs[i].benefit < 50) {
        drugs[i].benefit = drugs[i].benefit + 1;
        if (drugs[i].name == "Fervex") {
          if (drugs[i].expiresIn < 11) {
            if (drugs[i].benefit < 50) {
              drugs[i].benefit = drugs[i].benefit + 1;
            }
          }
          if (drugs[i].expiresIn < 6) {
            if (drugs[i].benefit < 50) {
              drugs[i].benefit = drugs[i].benefit + 1;
            }
          }
        }
      }
    }
    if (drugs[i].name != "Magic Pill") {
      drugs[i].expiresIn = drugs[i].expiresIn - 1;
    }
    if (drugs[i].expiresIn < 0) {
      if (drugs[i].name != "Herbal Tea") {
        if (drugs[i].name != "Fervex") {
          if (drugs[i].benefit > 0) {
            if (drugs[i].name != "Magic Pill") {
              drugs[i].benefit = drugs[i].benefit - 1;
            }
          }
        } else {
          drugs[i].benefit = drugs[i].benefit - drugs[i].benefit;
        }
      } else {
        if (drugs[i].benefit < 50) {
          drugs[i].benefit = drugs[i].benefit + 1;
        }
      }
    }
  }

  return drugs;
}
