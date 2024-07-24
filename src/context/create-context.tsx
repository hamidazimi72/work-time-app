import React, { createContext as createContext_react, useContext as useContext_react, useState } from 'react';

import { ObjectAPI } from '@utils';

export const createContext: <T>(initState: T) => {
	Provider: ({ children }) => React.JSX.Element;

	useContext: () => {
		state: T;
		initState: T;
		setState: React.Dispatch<React.SetStateAction<T>>;
		overWrite: (payload: { value: any; scope?: string }) => any;
	};
} = (initState) => {
	type T = typeof initState;

	const stateContext = createContext_react(initState);
	const dispatcherContext = createContext_react<React.Dispatch<React.SetStateAction<T>>>(() => {});

	const Provider = ({ children }) => {
		const [state, setState] = useState(() => initState);

		return (
			<stateContext.Provider value={state}>
				<dispatcherContext.Provider value={setState}>{children}</dispatcherContext.Provider>
			</stateContext.Provider>
		);
	};

	const useContext = () => {
		const state = useContext_react(stateContext);
		const setState = useContext_react(dispatcherContext);
		const overWrite = ({ value = {}, scope = '' }: { value: any; scope?: string }) =>
			setState((PS: any) => ObjectAPI.overwrite(PS, { ...value }, scope || ''));

		return { state, setState, initState, overWrite };
	};

	return { useContext, Provider };
};
