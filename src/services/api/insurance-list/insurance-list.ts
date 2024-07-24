import { HTTPService } from '@services';

//______________________  	______________________//
export const $insuranceLists_insuranceType_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insuranceType: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `insurance-lists/${data?.param?.insuranceType}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insuranceLists_insuranceType_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insuranceType: string };
		body: { faName: string; enName: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `insurance-lists/${data?.param?.insuranceType}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insuranceLists_insuranceType_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insuranceType: string; id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `insurance-lists/${data?.param?.insuranceType}/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insuranceLists_insuranceType_id_DELETE = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insuranceType: string; id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `insurance-lists/${data?.param?.insuranceType}/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insuranceLists_insuranceType_id_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insuranceType: string; id: string };
		body: { faName: string; enName: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `insurance-lists/${data?.param?.insuranceType}/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
