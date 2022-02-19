import { MAX_BENEFIT, MIN_BENEFIT } from "../constants";

export const isExpired = (expiresIn: number) => expiresIn < 1;
export const isLowerMaxBenefit = (benefit: number) => benefit < MAX_BENEFIT;
export const isHigherMinBenefit = (benefit: number) => benefit > MIN_BENEFIT;
