import { HTTPService } from '@services';

// ______________________  	______________________//
export const $users_login_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { password: string; username: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/users/login`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $users_register_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { username: string; password: string; nationalNumber?: string; mobile?: string; firstname?: string; lastname?: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/users`,
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $users_username_reset_password_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { password: string; newPassword: string };
		param: { username: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `api/v1/users/${data?.param?.username}/reset-password`,
				...data,
			}),
		handlerConfig,
	);
