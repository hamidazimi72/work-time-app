import { HTTPService } from '@services';

// ______________________  	______________________//
export const $tasks_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: { isComplete?: boolean; dateFrom: Date | undefined; dateTo: Date | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `api/v1/tasks`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $tasks_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { isComplete: boolean; title: string; date: Date | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/tasks`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $task_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { isComplete: boolean; title: string; date: Date | undefined };
		param: { id: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `api/v1/tasks/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $tasks_id_DELETE = async (handlerConfig: Service_configHandler, data: Service_data & { param: { id: number } }) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `api/v1/tasks/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
