import { HTTPService } from '@services';

//______________________  	______________________//
export const $fileManager_insurancePolicyId_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { insurancePolicyId: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: `file-manager/${data?.param?.insurancePolicyId}`,
				...data,
			}),
		handlerConfig,
	);
