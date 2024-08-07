import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { Convert, DateAPI } from '@utils';

import { createContext } from '../../create-context';

let date = new DateObject({ calendar: persian, locale: persian_fa });

let arrivalDateFrom_iso = DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toFirstOfMonth().format()))?.iso;
let arrivalDateTo_iso = DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toLastOfMonth().format()))?.iso;

export type InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: Service_status;
		$fetchItems: API_worktimes_item[];

		totalTime: number;

		filter: {
			arrivalDateFrom: Date | string | undefined;
			arrivalDateTo: Date | string | undefined;
			arrivalSort: 'asc' | 'dec';
		};
	};
	//____________________** add one item **____________________//
	addItem: {
		_addItem: Service_status;
		show: boolean;
		form: {
			arrivalDate: Date | string | undefined;
			departureDate: Date | string | undefined;
			isVacation: boolean;
		};
	};
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: Service_status;
		selectedItem: API_example_getAll_item | null;
		form: {
			id: string;
			arrivalDate: Date | string | undefined;
			departureDate: Date | string | undefined;
			isVacation: boolean;
		};
	};
	//____________________** delete one item **____________________//
	deleteItem: {
		_deleteItem: Service_status;
		selectedItem: API_worktimes_item | null;
	};
	//____________________** other global scope fields **____________________//
};

export const initState: InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: 'init',
		$fetchItems: [],

		totalTime: 0,

		filter: {
			arrivalDateFrom: arrivalDateFrom_iso,
			arrivalDateTo: arrivalDateTo_iso,
			arrivalSort: 'asc',
		},
	},
	//____________________** add one item **____________________//
	addItem: {
		_addItem: 'init',

		show: false,

		form: {
			arrivalDate: '',
			departureDate: '',
			isVacation: false,
		},
	},
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: 'init',

		selectedItem: null,

		form: {
			id: '',
			arrivalDate: '',
			departureDate: '',
			isVacation: false,
		},
	},
	//____________________** delete one item **____________________//
	deleteItem: {
		_deleteItem: 'init',

		selectedItem: null,
	},
	//____________________** other global scope fields **____________________//
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
