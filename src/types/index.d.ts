export type UpdateBenefitFn = (drug: DrugProps) => DrugProps;

export type DrugProps = {
	name: string;
	expiresIn: number;
	benefit: number;
}