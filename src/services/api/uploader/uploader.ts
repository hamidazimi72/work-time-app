import { HTTPService } from '@services';

//______________________  	______________________//
export const $uploader_GET = async (handlerConfig: Service_configHandler, data: Service_data) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: 'uploader',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $uploader_upload_POST = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		body: { file: any; fileType: 'image' | 'pdf' | 'excel' };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'POST',
				path: 'uploader/upload',
				...data,
			}),
		handlerConfig,
	);

//______________________  	______________________//
export const $uploader_download_filename_GET = async (
	handlerConfig: Service_configHandler,
	data: Service_data & {
		param: { filename: string };
	},
) =>
	await HTTPService.handler(
		async () =>
			await HTTPService.call({
				method: 'GET',
				path: `uploader/download/${data?.param?.filename}`,
				responseType: 'blob',
				...data,
			}),
		handlerConfig,
	);
