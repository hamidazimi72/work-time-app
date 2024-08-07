import { HTTPService } from '@services';

// ______________________  	______________________//
export const $worktimes_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			arrivalDateFrom?: Date | string | undefined;
			arrivalDateTo?: Date | string | undefined;
			arrivalSort?: 'asc' | 'dec';
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `api/v1/worktimes`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $worktimes_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { arrivalDate: Date | string | undefined; departureDate: Date | string | undefined; isVacation: boolean };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/worktimes`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $worktimes_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { arrivalDate: Date | string | undefined; departureDate: Date | string | undefined; isVacation: boolean };
		param: { id: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `api/v1/worktimes/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $worktimes_id_DELETE = async (
	handlerConfig: Service_configHandler,
	data: Service_data & { param: { id: number } },
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `api/v1/worktimes/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
