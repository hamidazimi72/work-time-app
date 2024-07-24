import { CheckPatterns } from '@utils';

type Response = {
	ok: boolean;
	url: string;
	status: number;
	timeout: number | null;
	response: any;
	responseTime: number;
	responseText: string;
	responseType: XMLHttpRequestResponseType;
	responseXML: Document | null;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export class HttpAPI {
	//----------* SendRequest *----------//
	static xhrRequest = (
		method: Method,
		url: string,
		options?: {
			timeout?: number;
			headers?: { [key: string]: any };
			body?: XMLHttpRequestBodyInit;
		},
	) =>
		new Promise((resolve: (res: Response) => any) => {
			const xhr = new XMLHttpRequest();

			const resolveHandler = (e: Event) => {
				resolve({
					ok: (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304,
					url: xhr.responseURL,
					status: xhr.status,
					timeout: xhr.timeout || null,
					responseTime: Math.round(e.timeStamp || 0),
					response: CheckPatterns.isJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.response,
					responseText: xhr.responseText,
					responseType: xhr.responseType,
					responseXML: xhr.responseXML,
				});
			};

			xhr.addEventListener('readystatechange', (e) => (xhr.readyState === 4 ? resolveHandler(e) : null));

			xhr.open(method, url);

			if (options?.headers) Object.entries(options?.headers).map(([key, value]) => xhr.setRequestHeader(key, value));
			if (!options?.headers?.['Content-Type']) xhr.setRequestHeader('Content-Type', 'application/json');
			if (options?.timeout) xhr.timeout = options?.timeout;

			xhr.send(options?.body);
		});
}
