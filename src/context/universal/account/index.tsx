import { createContext } from '../../create-context';

export type InitState = {
	[key: string]: any;

	id: string;
	username: string;
	lastname: string;
	firstname: string;
};

export const initState: InitState = {
	id: '',
	username: '',
	lastname: '',
	firstname: '',
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
