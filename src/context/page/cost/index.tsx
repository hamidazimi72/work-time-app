import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { Convert, DateAPI } from '@utils';

import { createContext } from '../../create-context';

let date = new DateObject({ calendar: persian, locale: persian_fa });

let dateFrom_timeStamp = Number(DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toFirstOfMonth().format()))?.timeStamp);
let dateTo_timeStamp = Number(DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toLastOfMonth().format()))?.timeStamp);

export type InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: Service_status;
		$fetchItems: API_costs_item[];

		totalCosts: number;

		filter: {
			dateFrom: number | Date | undefined;
			dateTo: number | Date | undefined;
			dateSort: 'asc' | 'dec';
		};
	};
	//____________________** add one item **____________________//
	addItem: {
		_addItem: Service_status;
		show: boolean;
		test: string;
		form: {
			date: number | Date | undefined;
			price: string;
			category: string;
			description: string;
		};
	};
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: Service_status;
		selectedItem: API_example_getAll_item | null;
		form: {
			id: string;
			date: number | Date | undefined;
			price: string;
			category: string;
			description: string;
		};
	};
	//____________________** delete one item **____________________//
	deleteItem: {
		_deleteItem: Service_status;
		selectedItem: API_costs_item | null;
	};
	//____________________** other global scope fields **____________________//
};

export const initState: InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: 'init',
		$fetchItems: [],

		totalCosts: 0,

		filter: {
			dateFrom: dateFrom_timeStamp,
			dateTo: dateTo_timeStamp,
			dateSort: 'asc',
		},
	},
	//____________________** add one item **____________________//
	addItem: {
		_addItem: 'init',

		show: false,
		test: '',

		form: {
			category: '',
			date: undefined,
			description: '',
			price: '',
		},
	},
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: 'init',

		selectedItem: null,

		form: {
			id: '',
			category: '',
			date: undefined,
			description: '',
			price: '',
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
