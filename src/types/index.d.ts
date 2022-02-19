export type UpdateBenefitFn = (drug: Drug) => Drug

export type Drug = {
  name: string;
  expiresIn: number;
  benefit: number;
};
