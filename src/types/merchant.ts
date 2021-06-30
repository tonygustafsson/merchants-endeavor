export type Merchant = {
	name: string;
	gender: string;
	nationality: string;
	town: string;
	doubloons: number;
	loans: Loan[];
};

export type Loan = {
	id: string;
	tick: number;
	sum: number;
};
