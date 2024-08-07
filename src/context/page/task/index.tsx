import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { createContext } from '../../create-context';
import { Convert, DateAPI } from '@utils';

let date = new DateObject({ calendar: persian, locale: persian_fa });

let fromDate_iso = DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toFirstOfWeek().format()))?.iso;
let toDate_iso = DateAPI.jalaaliToGregorian(Convert.faDigitToEn(date?.toLastOfWeek().format()))?.iso;

export type InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: Service_status;
		$fetchItems: API_task_item[];
		formattedItems: { [key: string]: API_task_item[] };
		filter: {
			isComplete: { name: string; value: string };
			fromDate: Date | string | undefined;
			toDate: Date | string | undefined;
		};
	};
	//____________________** add one item **____________________//
	addItem: {
		_addItem: Service_status;
		show: boolean;
		form: {
			isComplete: boolean;
			title: string;
			date: Date | string | undefined;
		};
	};
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: Service_status;
		selectedItem: API_task_item | null;
		form: {
			isComplete: boolean;
			title: string;
			date: Date | string | undefined;
		};
	};
	//____________________** delete one item **____________________//
	deleteItem: {
		_deleteItem: Service_status;
		selectedItem: API_task_item | null;
	};
	//____________________** other global scope fields **____________________//
};

export const initState: InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: 'init',
		$fetchItems: [],
		formattedItems: {},

		filter: {
			isComplete: { name: 'همه موارد', value: 'undefined' },
			fromDate: fromDate_iso,
			toDate: toDate_iso,
		},
	},
	//____________________** add one item **____________________//
	addItem: {
		_addItem: 'init',

		show: false,

		form: {
			isComplete: false,
			title: '',
			date: '',
		},
	},
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: 'init',

		selectedItem: null,

		form: {
			isComplete: false,
			title: '',
			date: '',
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
