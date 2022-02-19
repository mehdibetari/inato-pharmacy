import { UpdateBenefitFn } from "../../types";
import { isHigherMinBenefit, isExpired } from "../../helpers";

export const defaultUpdateFn: UpdateBenefitFn = ({
	expiresIn,
	benefit,
	name,
}) => {
	let newBenefit: number = benefit;
	if (isHigherMinBenefit(benefit)) {
		isExpired(expiresIn)
			? (newBenefit = benefit >= 2 ? benefit - 2 : 0)
			: (newBenefit = benefit >= 1 ? benefit - 1 : 0);
	}
	const newExpiresIn: number = expiresIn - 1;
	return { benefit: newBenefit, expiresIn: newExpiresIn, name };
};
