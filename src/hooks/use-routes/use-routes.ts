import { useRouter } from 'next/router';

export const useRoutes = () => {
	const router = useRouter();

	const insertQuery = (query: { [key: string]: any }, scroll?: boolean) => {
		const queries = router.query || {};

		const params = new URLSearchParams({ ...queries, ...query });

		router.push(`${router.pathname}?${params.toString()}`);
	};

	const removeQuery = (names: string[]) => {
		const params = new URLSearchParams(window?.location?.search || '');

		names.map((name) => {
			params.delete(name);
		});

		router.push(`${router.pathname}?${params.toString()}`);
	};

	return { ...router, insertQuery, removeQuery };
};
