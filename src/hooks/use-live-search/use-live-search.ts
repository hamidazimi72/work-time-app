import { useState } from 'react';

import { useDidMount } from '@hooks';

export const useLiveSearch = (value = '', onSearch = () => {}, setting = { delay: 2000 }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const delay = setting?.delay ?? 2000;

	useDidMount(() => {
		setSearchTerm(value);
	}, [value]);

	useDidMount(() => {
		const timer = setTimeout(() => {
			onSearch();
		}, delay);

		return () => clearTimeout(timer);
	}, [searchTerm]);
};
