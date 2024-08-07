declare type API_worktimes_item = {
	[key: string]: any;

	id: number;
	user?: string;
	arrivalTime: Date | string | undefined;
	departureTime: Date | string | undefined;
	isVacation: boolean;
};
