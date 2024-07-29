import { createContext } from '../../create-context';

export type InitState = {
	//____________________** fetch All items **____________________//
	fetchItems: {
		_fetchItems: Service_status;
		$fetchItems: API_task_item[];
		filter: {
			isComplete: { name: string; value: string };
		};
	};
	//____________________** add one item **____________________//
	addItem: {
		_addItem: Service_status;
		show: boolean;
		form: {
			isComplete: boolean;
			title: string;
		};
	};
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: Service_status;
		selectedItem: API_task_item | null;
		form: {
			isComplete: boolean;
			title: string;
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

		filter: {
			isComplete: { name: 'همه موارد', value: 'undefined' },
		},
	},
	//____________________** add one item **____________________//
	addItem: {
		_addItem: 'init',

		show: false,

		form: {
			isComplete: false,
			title: '',
		},
	},
	//____________________** edit one item **____________________//
	editItem: {
		_editItem: 'init',

		selectedItem: null,

		form: {
			isComplete: false,
			title: '',
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
