import { HTTPService } from '@services';

//______________________  	______________________//
export const $discount_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { title_fa: string; title_en: string; amount: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'discount',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $discount_GET = async (handlerConfig: Service_configHandler, data: Service_data) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'discount',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $discount_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `discount/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $discount_id_DELETE = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `discount/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $discount_id_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `discount/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $discount_id_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
		body: { title_fa: string; title_en: string; amount: number };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `discount/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
