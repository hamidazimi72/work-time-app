type URLPrimitiveType = {
	host: string;
	pathname: string;
	hostname: string;
	port: string;
	href: string;
	search: string;
	hash: string;
	origin: string;
	username: string;
	password: string;
	protocol: string;
};

type Query = { [key: string]: string };
type Params = string[];

export class UrlApi {
	url: URL = new URL(location?.href || 'https://example.com');

	constructor(url?: string) {
		if (url) this.url = new URL(url || location?.href);
	}

	getProperties = () => {
		const { host, pathname, hostname, port, href, search, hash, origin, username, password, protocol, searchParams } = this.url;
		const queries = searchParams.toString();
		const query: Query = queries.split('&').reduce((result, current) => {
			const keyPair = current.split('=');
			result[keyPair[0] || ''] = keyPair[1] || '';
			return result;
		}, {});
		const params = pathname.split('/').reduce((result: Params, current) => {
			if (current) result.push(current);
			return result;
		}, []);

		return {
			host,
			pathname,
			hostname,
			port: port || (protocol === 'http:' && '80') || (protocol === 'https:' && '443') || '',
			href,
			search,
			hash,
			origin,
			username,
			password,
			protocol,
			query,
			params,
			searchParams,
		};
	};

	setProperties = (property: Partial<URLPrimitiveType> & { query?: Query } = {}) => {
		Object.entries(property).map(([propertyKey, propertyValue], i) => {
			if (propertyKey === 'query') {
				Object.entries(propertyValue || {}).map(([queryKey, queryValue], i) => {
					this.url.searchParams.set(queryKey, queryValue);
				});
				return;
			}
			this.url[propertyKey] = propertyValue;
		});
	};

	removeProperties = (property: { query?: string[] }) => {
		Object.entries(property).map(([propertyKey, propertyValue], i) => {
			if (propertyKey === 'query') {
				(propertyValue || []).map((queryKey, i) => {
					this.url.searchParams.delete(queryKey);
				});
				return;
			}
		});
	};

	static getLastQueryValue = (queryValues: string | string[] | undefined) => {
		return typeof queryValues === 'object' ? queryValues[queryValues.length - 1] || '' : queryValues || '';
	};

	static pushQuery = (
		handler: (url: URL, as: URL | undefined, options: { [key: string]: any }) => any,
		queryName: string,
		queryValue: string,
		scroll?: boolean,
		location?: string,
	) => {
		if (!handler) return;

		const Url = new UrlApi(location || window.location.href);
		Url.setProperties({ query: { [queryName]: queryValue } });
		handler(Url.url, undefined, { scroll: scroll || false });
	};
}
