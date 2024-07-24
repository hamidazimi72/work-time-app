import { createContext } from '../../create-context';

export type InitState = { _status: Service_status; username: string; password: string };

export const initState: InitState = { _status: 'init', username: '', password: '' };

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
