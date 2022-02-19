import { customUpdateRules, defaultUpdateFn } from "./specs";
import { DrugProps } from "./types";

export class Drug {
  constructor(
    public name: string,
    public expiresIn: number,
    public benefit: number
  ) {}

  toJSON(): DrugProps {
    return {
      name: this.name,
      expiresIn: this.expiresIn,
      benefit: this.benefit,
    };
  }

  updateBenefitValue() {
    const newProps = customUpdateRules[this.name]
      ? customUpdateRules[this.name](this)
      : defaultUpdateFn(this);

    this.expiresIn = newProps.expiresIn;
    this.benefit = newProps.benefit;

    return this;
  }
}

export class Pharmacy {
  constructor(public drugs: Array<Drug | void> = []) {}

  toJSON(): Array<DrugProps> {
    return this.drugs.map((drug) => drug && drug.toJSON());
  }

  updateBenefitValue() {
    this.drugs = this.drugs.map((drug) => drug && drug.updateBenefitValue());

    return this.drugs;
  }
}
