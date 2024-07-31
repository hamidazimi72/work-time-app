import { createContext } from '../../create-context';

export type InitState = {
	resetPassword: {
		_status: Service_status;
		// username: string;
		password: string;
		newPassword: string;
		repeatNewPassword: string;
	};
};

export const initState: InitState = {
	resetPassword: {
		_status: 'init',
		// username: '',
		password: '',
		newPassword: '',
		repeatNewPassword: '',
	},
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
