import { HTTPService } from '@services';

// ______________________  	______________________//
export const $user_signin_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { nationalCode: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'user/signin',
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $user_signinVerify_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { nationalCode: string; otp: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'user/signinverify',
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $user_signup_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { nationalCode: string; mobile: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'user/signup',
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $user_signupVerify_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { nationalCode: string; otp: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'user/signupverify',
				...data,
			}),
		handlerConfig,
	);

// ______________________  	______________________//
export const $user_profile_active_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { nationalCode: string; dateOfBirth: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'user/profile/active',
				...data,
			}),
		handlerConfig,
	);
