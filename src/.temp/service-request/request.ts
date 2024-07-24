import { HTTPService } from '@services';

//______________________  	______________________//
export const $example_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { username: string; password: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'example',
				...data,
			}),
		handlerConfig,
	);
