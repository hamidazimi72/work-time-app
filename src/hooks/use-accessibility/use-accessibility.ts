/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import router from 'next/router';

import { LocalStorageAPI } from '@utils';
import { universal_account } from '@context';

type Config = { clearStorageOnDenyAccess?: boolean; redirect?: boolean };

export const useAccessibility = (
	accessTypes: string[] = [],
	config: Config = { clearStorageOnDenyAccess: false, redirect: true },
) => {
	const { state: account } = universal_account.useContext();
	const type = account?.type || null;

	const [allow, setAllow] = useState<null | boolean>(null);

	const clearStorageOnDenyAccess: boolean = config?.clearStorageOnDenyAccess || false;
	const redirect: boolean = config?.redirect || true;

	const redirectPaths = {
		G: { path: '/login' }, //Guest
		C: { path: '/dashboard' }, //Customer
		A: { path: '/dashboard' }, //Admin
		S: { path: '/dashboard' }, //SuperAdmin
	};

	useEffect(() => {
		if (!type) return;

		const findedItem = accessTypes.find((item) => item === type);

		const allowAccess = findedItem ? true : false;

		setAllow(allowAccess);

		if (!findedItem && clearStorageOnDenyAccess) LocalStorageAPI.logout();

		// redirect
		if (!allowAccess && redirect) {
			if (!findedItem && redirectPaths[type]?.path) router.push(redirectPaths[type].path, undefined);
		}
	}, [type]);

	return { allow };
};
