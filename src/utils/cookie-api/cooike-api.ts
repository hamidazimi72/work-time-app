export class CookieAPI {
	static getAllCookies = (): { name: string; value: any }[] => {
		const cookies = ((document.cookie || '').split(';') || []).reduce((result: any, current: any) => {
			const [name, value] = current.split('=');
			result.push({ name: decodeURIComponent(name || ''), value: decodeURIComponent(value || '') });
			return result;
		}, []);

		return cookies;
	};

	static setItem = (options: {
		name: string;
		value: string | number;
		maxAge?: number; // second
		expire?: number | string | Date | null;
		path?: string;
		secure?: boolean; // just in https protocol
		httpOnly?: boolean; // not access by frontend
		sameSite?: 'none' | 'lax' | 'strict';
	}) => {
		const { name, value, maxAge, expire, path, secure, httpOnly, sameSite } = options || {};

		const isValidExpireDate = (typeof expire === 'string' && Date.parse(expire)) || typeof expire === 'number';
		if (expire && isValidExpireDate) console.error("Set Cookie 'Expire Date' Is Invalid");

		const mainSection = `${encodeURIComponent(name || '')}=${encodeURIComponent(value || '')};`;
		const maxAgeSection = maxAge ? `Max-Age=${maxAge};` : '';
		const expireSerction = expire && isValidExpireDate ? `expires=${new Date(expire).toUTCString()};` : '';
		const pathSection = path ? `path=${path};` : '';
		const secureSection = secure ? `secure;` : '';
		const sameSiteSection = sameSite ? `sameSite=${sameSite};` : '';

		document.cookie = `${mainSection}${maxAgeSection}${expireSerction}${pathSection}${secureSection}${sameSiteSection}`;
	};

	static getItem = (name: string = ''): { name: string; value: any } | null => {
		const cookies = this.getAllCookies();
		const findedItem = cookies.find((cookie) => cookie?.name === name);

		return findedItem ? findedItem : null;
	};

	static deleteItem = (name: string = '') => {
		this.setItem({ name, value: '', expire: 1 });
	};
}
