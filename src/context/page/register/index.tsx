import { createContext } from '../../create-context';

export type InitState = {
	_status: Service_status;
	form: {
		username: string;
		password: string;
		nationalNumber: string;
		mobile: string;
		firstname: string;
		lastname: string;
	};
};

export const initState: InitState = {
	_status: 'init',
	form: {
		username: '',
		password: '',
		nationalNumber: '',
		mobile: '',
		firstname: '',
		lastname: '',
	},
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
