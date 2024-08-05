import { HTTPService } from '@services';

// ______________________  	______________________//
export const $costs_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: { dateFrom: Date | undefined; dateTo: Date | undefined; dateSort: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `api/v1/costs`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $costs_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { date: number | Date | undefined; price: number; category: string; description: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/costs`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $costs_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { date: number | Date | undefined; price: number; category: string; description?: string };
		param: { id: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `api/v1/costs/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $costs_id_DELETE = async (handlerConfig: Service_configHandler, data: Service_data & { param: { id: number } }) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `api/v1/costs/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
