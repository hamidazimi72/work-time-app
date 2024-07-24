export class SessionStorageAPI {
	static setItem = (name: string = '', value: any, method?: 'simple' | 'json') => {
		try {
			if (!name) return;

			let formattedValue = value;

			if (method === 'json') formattedValue = JSON.stringify(value);

			sessionStorage.setItem(name, value);
		} catch (error) {}
	};

	static getItem = (name: string = '', method?: 'simple' | 'json') => {
		try {
			if (!name) return null;

			const item = sessionStorage.getItem(name);
			if (!item) return null;
			if (method === 'json') return JSON.parse(item);
			return item;
		} catch (err) {
			return null;
		}
	};

	static deleteItem = (name: string = '') => {
		if (!name) return null;
		return sessionStorage.removeItem(name);
	};

	static getAll = () => {
		return { ...sessionStorage };
	};
}
