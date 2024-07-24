import { HTTPService } from '@services';

//______________________  	______________________//
export const $roleManagement_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { role: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `role-management/${data?.param?.role}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $roleManagement_list_filter_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { filter: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `role-management/list/${data?.param?.filter}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $roleManagement_giveAccess_role_userId_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { userId: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `role-management/give-access/role/${data?.param?.userId}`,
				...data,
			}),
		handlerConfig,
	);
