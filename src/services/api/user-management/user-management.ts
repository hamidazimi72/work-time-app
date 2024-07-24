import { HTTPService } from '@services';

//______________________  	______________________//
export const $userManagement_nationalCode_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { nationalCode: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `user-management/${data?.param?.nationalCode}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $userManagement_relatives_nationalCode_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { nationalCode: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `user-management/relatives/${data?.param?.nationalCode}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $userManagement_get_relatives_GET = async (
	handlerConfig: Service_configHandler,
	data?: Service_data,
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `user-management/get/relatives`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $userManagement_profile_signupNoOtp_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: {
			nationalCode: string;
			mobile: string;
			dateOfBirth: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `user-management/profile/signupNoOtp`,
				...data,
			}),
		handlerConfig,
	);


//______________________  	______________________//
export const $userManagement_relatives_mainNationalCode_relatedNationalCode_relationId_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: {
			mainNationalCode: string;
			relatedNationalCode: string;
			relationId: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `user-management/relatives/${data?.param?.mainNationalCode}/${data?.param?.relatedNationalCode}/${data?.param?.relationId}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $userManagement_legal_nationalId_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { nationalId: string; };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `user-management/legal/${data?.param?.nationalId}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $userManagement_legal_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: {
			userType: "LEGAL";
			nationalID: string;
			companyName: string;
			// registrationNumber: number;
			submitDate: string;
			economicCode: string;
			address: string;
			postalCode: number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `user-management/legal`,
				...data,
			}),
		handlerConfig,
	);
