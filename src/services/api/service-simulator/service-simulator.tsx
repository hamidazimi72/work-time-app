import { useToast } from '@hooks';
import { toast } from 'react-toastify';

//______________________ 	______________________//
export const $serviceSimulator_POST = async (
	handlerConfig: Service_configHandler,
	data: {
		okResponse?: boolean;
		delay?: number;
		responseType?: 'object' | 'array' | 'custom';
		dataModel?: object;
	},
) => {
	const { showToast } = useToast();

	const dataModel = data?.dataModel || { name: 'name', symbol: 'symbol' };
	const response =
		(data?.responseType === 'object' && dataModel) ||
		(data?.responseType === 'array' && new Array(20).fill(dataModel)) ||
		dataModel;

	if (handlerConfig?.onStatus) handlerConfig.onStatus('loading');
	setTimeout(() => {
		if (data?.okResponse && handlerConfig?.onOk) {
			if (handlerConfig?.onStatus) handlerConfig.onStatus('ok');
			handlerConfig.onOk(data?.responseType === 'custom' ? dataModel : { info: response });
			if (handlerConfig?.okMessage || handlerConfig?.showOkMessage)
				showToast({ showIcon: true, type: 'success', message: 'عملیات با موفقیت انجام شد' });
		} else if (handlerConfig?.onFail) {
			if (handlerConfig?.onStatus) handlerConfig.onStatus('fail');
			handlerConfig.onFail(false);
			if (handlerConfig?.failMessage || handlerConfig?.showFailMessage)
				showToast({ showIcon: true, type: 'danger', message: 'مشکلی پیش آمده' });
		}
	}, data?.delay || 1000);
};
