import { createContext } from '../../create-context';

export type InitState = { sideNavShow: boolean };

export const initState: InitState = { sideNavShow: false };

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
