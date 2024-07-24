import { HTTPService } from '@services';

//______________________  	______________________//
export const $offer_type_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { type: string };
		body: {
			name?: string;
			engLabel?: string;
			paymentMode?: string;
			paymentType?: string;
			price?: number;
			monthlyPrice?: number;
			duration?: string;
			durationUnit?: 'day' | 'year' | string;
			maxCommitmentMain?: number;
			maxCommitmentSub?: number;
			numOfSubs?: number;
			waitMonthForGivingBirth?: number;
			waitMonthForSpecialIllness?: number;
			waitMonthForOtherIllness?: number;
			franchise?: number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `offer/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_type_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { type: string | undefined };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `offer/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			page?: number;
			take?: number;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `offer`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_offerId_type_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { offerId: string; type: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `offer/${data?.param?.offerId}/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_offerId_type_PATCH = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { offerId: string; type: string };
		body: {
			name: string;
			engLabel: string;
			paymentMode: string;
			paymentType: string;
			duration: string;
			price: number;
			franchise: number;
			commitment: any[];
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PATCH',
				path: `offer/${data?.param?.offerId}/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_offerId_type_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { offerId: string; type: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `offer/${data?.param?.offerId}/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_offerId_type_DELETE = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { offerId: string; type: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'DELETE',
				path: `offer/${data?.param?.offerId}/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_commitment_title_list_GET = async (handlerConfig: Service_configHandler, data: Service_data & {}) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `offer/commitment/title/list`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_commitment_search_v1_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		query: {
			page?: number;
			take?: number;
			//
			isActive?: boolean;
			commitmentKindId?: number;
			commitmentTitle?: string;
			offerUniqueCode?: number;
			offerType?: string;
			offerName?: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `offer/commitment/search/v1`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_commitment_type_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: {
			title?: string;
			commitmentKind?: string;
			commitmentKindId?: number;
			maxCommitmentMain?: number;
			maxCommitmentSub?: number;
			offerUniqueCode?: number;
			offerId?: string;
			franchise?: number;
			commitmentUniqueCode?: number;
		};
		param: {
			type: string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `offer/commitment/${data?.param?.type}`,
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $offer_commitmentId_PUT = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: {
			commitmentId: number | string;
		};
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'PUT',
				path: `offer/${data?.param?.commitmentId}`,
				...data,
			}),
		handlerConfig,
	);
