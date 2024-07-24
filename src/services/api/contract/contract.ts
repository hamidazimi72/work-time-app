import { HTTPService } from '@services';

//______________________  	______________________//
export const $contract_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: {
			contractTypeId?: string;
			startDate?: string;
			endDate?: string;
			description?: string;
			sodurUnitCode?: string;
			moarefUnitCode?: string;
			contractNum?: string;
			insurer?: string;
			contractParty?: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'contract',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & { query: { page: string | number } },
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'contract',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_document_search_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			startDate?: string | null;
			endDate?: string | null;
			contractingParty?: string | null;
			type?: '1' | '2' | null | any;
			contractType?: '1' | '2' | null | any;
			sodurCode?: string | number | null | any;
			uniqueCode?: string | number | null | any;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'contract/document/search',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: {
			contractName: string;
			contractDescription: string;
			isActive: boolean;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'contract/type',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_GET = async (handlerConfig: Service_configHandler, data: {}) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'contract/type',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `contract/type/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_id_DELETE = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `contract/type/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_id_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `contract/type/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_type_id_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { contractName: string; contractDescription: string; isActive: boolean };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `contract/type/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $contract_id_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `contract/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
