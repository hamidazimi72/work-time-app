export class LocalStorageAPI {
	static setItem = (name: string = '', value: any, method?: 'simple' | 'json') => {
		try {
			if (!name) return;

			let formattedValue = value;

			if (method === 'json') formattedValue = JSON.stringify(value);

			localStorage.setItem(name, formattedValue);
		} catch (error) {}
	};

	static getItem = (name: string = '', method?: 'simple' | 'json') => {
		try {
			if (!name) return null;

			const item = localStorage.getItem(name);
			if (!item) return null;
			if (method === 'json') return JSON.parse(item);
			return item;
		} catch (err) {
			return null;
		}
	};

	static deleteItem = (name: string = '') => {
		if (!name) return null;
		return localStorage.removeItem(name);
	};

	static getAll = () => {
		return { ...localStorage };
	};

	static storageListener = (addListenerCb: (e: StorageEvent) => any) => {
		window.addEventListener('storage', addListenerCb);

		const removeListener = () => window.removeEventListener('storage', addListenerCb);

		return { removeListener };
	};

	static logout = (redirectTo?: string | undefined) => {
		localStorage.removeItem('token');
		localStorage.removeItem('_account');
		localStorage.removeItem('token-expired-time');
		if (redirectTo) location.replace(redirectTo);
	};
}
