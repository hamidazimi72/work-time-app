import { HTTPService } from '@services';

// ______________________  	______________________//
export const $task_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: { isComplete?: boolean; dateFrom: number | undefined; dateTo: number | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `api/v1/task`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $task_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { isComplete: boolean; title: string; date: number | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/task`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $task_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { id: number; isComplete: boolean; title: string; date: number | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `api/v1/task`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $task_id_DELETE = async (handlerConfig: Service_configHandler, data: Service_data & { param: { id: number } }) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `api/v1/task/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
