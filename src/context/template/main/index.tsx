import { createContext } from '../../create-context';

export type InitState = {
	collapseSubMenu: boolean;

	subMenuActiveRoutes: { [key: string]: boolean };
};

export const initState: InitState = {
	collapseSubMenu: false,

	subMenuActiveRoutes: {
		health: true,
	},
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
