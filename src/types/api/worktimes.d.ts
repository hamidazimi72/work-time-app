declare type API_worktimes_item = {
	[key: string]: any;

	id: number;
	user?: string;
	arrivalTime: number;
	departureTime: number;
	isVacation: boolean;
};

declare type API_offer = API_offers_item & {};
