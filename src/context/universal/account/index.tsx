import { createContext } from '../../create-context';

export type InitState = {
	[key: string]: any;

	id: string;
	username: string;
	lastName: string;
	firstName: string;
};

export const initState: InitState = {
	id: '',
	username: '',
	lastName: '',
	firstName: '',
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
