import { createContext } from '../../create-context';

export type InitState = {};

export const initState: InitState = {};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
