import { HTTPService } from '@services';

//______________________  	______________________//
export const $addendum_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			addendumStatus?: string;
			addendumUniqueCode?: string;
			insuranceUniqueCode?: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `addendum`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $addendum_insuranceUniqueCode_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: {
			uniqueCode: string | number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `addendum/${data?.param?.uniqueCode}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $addendum_insurancePolicyId_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insurancePolicyId: string };
		body: {
			addendumType: string;
			cause: string;
			applyDate: string;
			description: string;
			lastInsuranceCompany: string;
			canIssueIntroduction: string;
			addendumChangeType: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `addendum/${data?.param?.insurancePolicyId}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $addendum_insurancePolicyId_generalInformation_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insurancePolicyId: string };
		body: {
			cause?: string;
			applyDate?: string;
			description?: string;
			lastInsuranceCompany?: {
				lastInsuranceNum?: string;
				uniqueCode?: string;
			};
			canIssueIntroduction?: boolean;
			paymentMode?: number;
			paraZinaf?: string;
			hospitalZinaf?: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `addendum/${data?.param?.insurancePolicyId}/general-information`,
				...data,
			}),
		handlerConfig,
	);
