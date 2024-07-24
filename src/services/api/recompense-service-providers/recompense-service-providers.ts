import { HTTPService } from '@services';

//______________________  	______________________//
export const $recompenseServiceProviders_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { faName: string; enName: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'recompense-service-providers',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $recompenseServiceProviders_GET = async (handlerConfig: Service_configHandler, data?: Service_data) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'recompense-service-providers',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $recompenseServiceProviders_providerId_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { providerId: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `recompense-service-providers/${data?.param?.providerId}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $recompenseServiceProviders_providerId_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { providerId: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `recompense-service-providers/${data?.param?.providerId}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $recompenseServiceProviders_providerId_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { providerId: string };
		body: { faName: string; enName: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `recompense-service-providers/${data?.param?.providerId}`,
				...data,
			}),
		handlerConfig,
	);
