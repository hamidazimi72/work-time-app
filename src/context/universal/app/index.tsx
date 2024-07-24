import { createContext } from '../../create-context';

export type InitState = {
	theme: string;
	language: string;
	platform: {
		os: null | 'MacOS' | 'IOS' | 'Windows' | 'Android' | 'Linux';
	};
	windowSize: {
		height: number;
		width: number;
	};
	responsiveSize: {
		sm: number;
		md: number;
		lg: number;
		xl: number;
	};
};

export const initState: InitState = {
	theme: '',
	language: '',
	platform: {
		os: null,
	},
	windowSize: {
		height: 0,
		width: 0,
	},
	responsiveSize: {
		sm: 0,
		md: 0,
		lg: 0,
		xl: 0,
	},
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
