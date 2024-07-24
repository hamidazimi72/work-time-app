import axios, { AxiosProgressEvent, AxiosResponse, ResponseType } from 'axios';
import { toast } from 'react-toastify';

import { appConfig } from '@services';
import { LocalStorageAPI } from '@utils';
import { useToast } from '@hooks';

axios.interceptors.response.use(
	(res) => {
		if (res?.data?.resultCode === -3) LocalStorageAPI.logout();
		return res;
	},
	(err) => {
		if (err?.response?.status === 401) LocalStorageAPI.logout();
		return Promise.reject(err);
	},
);

const showLog = () => localStorage.getItem('log-status') === 'show';

const defaultHeader = (method?: string) => ({
	Token: localStorage.getItem('token') ? `${JSON.parse(localStorage.getItem('token') || '')}` : null,
	'Accept-Language': localStorage.getItem('_language') || null,
	'Content-Type': 'application/json',
});

export class HTTPService {
	static call = async (config: {
		method: Http_method;
		path: string;
		defaultUri?: boolean | string;
		defaultTimeout?: true | number;
		body?: { [key: string]: any };
		query?: { [key: string]: string };
		header?: { [key: string]: any };
		onUploadProgress?: (event: AxiosProgressEvent) => any;
		responseType?: ResponseType;
	}) => {
		const {
			method = 'GET',
			defaultUri = true,
			defaultTimeout = true,
			path = '',
			body = {},
			query = {},
			header = {},
			onUploadProgress = undefined,
		} = config;

		const headers: {} = { ...defaultHeader(method), ...header };
		const timeout = (typeof defaultTimeout === 'number' && defaultTimeout) || appConfig.timeout;
		const uri = (defaultUri === true && appConfig.apiBaseUrl?.base) || (typeof defaultUri === 'string' && defaultUri) || '';
		const url = HTTPService.generateURL(uri, path, query);

		const responseType = config?.responseType || undefined;

		let axiosRequest: (() => Promise<AxiosResponse>) | null = null;

		if (/^((POST)|(post))$/.test(method))
			axiosRequest = () => axios.post(url, body, { headers, responseType, timeout, onUploadProgress });
		if (/^((PUT)|(put))$/.test(method))
			axiosRequest = () => axios.put(url, body, { headers, responseType, timeout, onUploadProgress });
		if (/^((PATCH)|(patch))$/.test(method))
			axiosRequest = () => axios.patch(url, body, { headers, responseType, timeout, onUploadProgress });
		if (/^((GET)|(get))$/.test(method)) axiosRequest = () => axios.get(url, { headers, responseType, timeout, onUploadProgress });
		if (/^((DELETE)|(delete))$/.test(method))
			axiosRequest = () => axios.delete(url, { headers, responseType, timeout, onUploadProgress });

		if (!axiosRequest) return;

		const { err, res }: { err: (Error & { response?: AxiosResponse }) | null; res: AxiosResponse | null } = await axiosRequest()
			.then((res) => ({ res, err: null }))
			.catch((err) => ({ res: null, err }));

		const data = res?.data || err?.response?.data || null;
		const errMessage = err?.message || '';
		const resHeaders = res?.headers || {};
		const status = `CODE: ${res?.status || '-'} , TEXT: ${res?.statusText || '-'}`;
		const statusCode = res?.status || '';

		const resultLog = `%c${path} %c${statusCode || errMessage}`;
		const resultPathStyle = `padding:2px; margin: 2px; border-radius:10px; background: ${
			(method === 'GET' && '#b70') ||
			(method === 'POST' && '#05a') ||
			(method === 'PUT' && '#59a') ||
			(method === 'PATCH' && '#8E44AD') ||
			(method === 'DELETE' && '#a00') ||
			'#05a'
		}; color: #fff`;
		const resultStatusStyle = `padding:2px; margin: 2px; border-radius:10px; background: ${err ? '#a00' : '#0a0'}; color: #fff`;

		if (appConfig.isDevelopment || showLog())
			console.log(resultLog, resultPathStyle, resultStatusStyle, {
				REQUEST: {
					url,
					body,
					headers,
					method,
				},
				RESPONSE: {
					json: data,
					status,
					err: errMessage,
					headers: resHeaders,
				},
			});

		return { data, res, err };
	};

	static handler = async (
		service: any = null,
		{
			// status
			onStatus = null,
			// state
			onOk = null,
			onFail = null,
			// message
			showFailMessage = true,
			failMessage = '' /* default: server Message */,
			showOkMessage = false,
			okMessage = '' /* default: server Message */,
		}: any,
	) => {
		if (!service) return;

		const changeStatus = (status) => {
			if (onStatus) onStatus(status);
		};

		changeStatus('loading');

		let request = await service();
		const [data, res, err] = [request?.data || null, request?.res || null, request?.err || null];

		const isSuccess = res?.status === 200 || res?.status === 201;

		const okMessageTitle = '';
		const okMessageContent = okMessage || data?.message || 'موفقیت آمیز';
		const failMessageTitle = data?.error || '';
		const failMessageContent = failMessage || data?.message || 'خطایی رخ داده است';

		const { showToast } = useToast();

		if (isSuccess) {
			changeStatus('ok');
			if (showOkMessage && (okMessageTitle || okMessageContent))
				showToast({ type: 'success', title: okMessageTitle, message: okMessageContent, showIcon: true });
			if (onOk) onOk(data);
		} else {
			changeStatus('fail');
			if (showFailMessage && (failMessageTitle || failMessageContent))
				showToast({ type: 'danger', title: failMessageTitle, message: failMessageContent, showIcon: true });
			if (onFail) onFail(data);
		}
	};

	static generateURL = (baseUri: string = '', path: string = '', query: any = {}) => {
		const BASEURI = !baseUri || baseUri === '/' ? '/' : `${baseUri}/`;
		const PATH = (path || '').replace(/^[\/]/, '');
		const QUERIES = HTTPService.generateQuery(query);

		return `${BASEURI}${PATH}${QUERIES}`;
	};

	static generateQuery = (query: any = {}) => {
		// const queriesKey = Object.keys(query).filter((key) => query[key] !== undefined);

		// if (!queriesKey.length) return '';
		// let queryString = '?';
		// Object.keys(query).map((key, i) => {
		// 	if (query[key] !== undefined)
		// 		queryString = `${queryString}${i === 0 || i + 1 === queriesKey.length ? '' : '&'}${key}=${query[key]}`;
		// });

		// return queryString;

		const queryParams = new URLSearchParams();

		Object.keys(query).map((key) => {
			if (query[key] !== undefined) queryParams.set(key, query[key]);
		});

		const queryString = queryParams.toString();

		return queryString ? `?${queryParams.toString()}` : '';
	};

	static checkToastError = () => document.querySelector('.Toastify__toast--error');
}

export default HTTPService;
