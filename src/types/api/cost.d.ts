declare type API_costs_item = {
	[key: string]: any;

	category: string;
	date: Date | string | undefined;
	description: string;
	id: number;
	price: number;
	user: string;
};
