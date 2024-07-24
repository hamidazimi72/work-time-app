import { HTTPService } from '@services';

//______________________  	______________________//
export const $unitList_type_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { type: string };
		body: { faName: string; enName: string; unitCode: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `unit-list/${data?.param.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $unitList_type_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { type: 'branch' | 'agency' | 'marketer' };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `unit-list/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $unitList_one_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `unit-list/one/${data?.param.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $unitList_id_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `unit-list/${data?.param.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $unitList_id_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
		body: { faName: string; enName: string; unitCode: number; recordId: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `unit-list/${data?.param.id}`,
				...data,
			}),
		handlerConfig,
	);
