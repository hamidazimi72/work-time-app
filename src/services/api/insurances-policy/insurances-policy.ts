import { HTTPService } from '@services';

//______________________  	______________________//
export const $insurancePolicy_GET = async (handlerConfig: Service_configHandler, data: Service_data & {}) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'insurances-policy',
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_search_query_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			startDate?: string;
			endDate?: string;
			status?: string;
			insuranceType?: number | string;
			insuranceCode?: string;
			sodurCode?: string;
			nationalCodeOfInsurer?: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'insurances-policy/search/query',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_type_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { type: string };
		body: {
			sodurId: string;
			moarefId: string;
			marketerUnitCode: number;
			//
			startDate: string;
			endDate: string;
			contractTypeId: string;
			contractDocumentId: string;
			paymentTypeId: string;
			hospitalBeneficiary: string;
			paraBeneficiary: string;
			recompenseServiceProviderId: string;
			canIssueIntroduction: boolean;
			canIssueIntroductionOnline: boolean;
			lastInsuranceCompanyDetailsId: string;
			expRecompenseAfter: number;
			expRecompenseIn: number;
			offerId: string;
			recompenseZarib: number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `insurances-policy/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `insurances-policy/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_type_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
		body: {
			contractTypeId: string;
			paymentTypeId: string;
			hospitalBeneficiary: string;
			paraBeneficiary: string;
			recompenseServiceProviderId: string;
			contractDocumentId: string;
			startDate: string;
			endDate: string;
			canIssueIntroduction: boolean;
			canIssueIntroductionOnline: boolean;
			lastInsuranceCompanyDetailsId: string;
			expRecompenseAfter: number;
			expRecompenseIn: number;
			offerId: string;
			sodurId: string;
			marketerUnitCode: number;
			moarefId: string;
			recompenseZarib: number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `insurances-policy/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_step_id_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { step: number; id?: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `insurances-policy/${data?.param?.step}/${data?.param?.id || ','}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $insurancePolicy_submit_id_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { id: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `insurances-policy/submit/${data?.param?.id}`,
				...data,
			}),
		handlerConfig,
	);
