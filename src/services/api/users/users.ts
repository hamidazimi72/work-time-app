import { HTTPService } from '@services';

// ______________________  	______________________//
export const $users_username_login_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { password: string };
		param: { username: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/users/${data?.param?.username}/login`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $users_username_register_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { password: string; securityCode: number };
		param: { username: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/users/${data?.param?.username}/register`,
				...data,
			}),
		handlerConfig,
	);
