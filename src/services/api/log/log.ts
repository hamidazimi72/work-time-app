import { HTTPService } from '@services';

// ______________________  	______________________//
export const $log_serviceName_action_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { service_name: string; action: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `log/${data?.param?.service_name}/${data?.param?.action}`,
				...data,
			}),
		handlerConfig,
	);
