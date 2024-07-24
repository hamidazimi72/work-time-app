import { createContext } from '../../create-context';

export type InitState = {
	$insurance: API_insurance_list_item | null;

	fetchItems: {
		$fetchItems: API_userManagement_relatives_nationalCode_item[];

		filter: {
			from: number;
			size: number;
		};
	};

	markItem: {
		show: boolean;

		selectedItems: API_userManagement_relatives_nationalCode_item[];
	};

	unmarkItem: {
		selectedItem: API_userManagement_relatives_nationalCode_item | null;
	};

	//____________________** other global scope fields **____________________//
	$userRelativeList: API_userManagement_relatives_nationalCode_item[];
	_userRelativeList: Service_status;
};

export const initState: InitState = {
	$insurance: null,

	fetchItems: {
		$fetchItems: [],

		filter: {
			from: 1,
			size: 10,
		},
	},

	markItem: {
		show: false,

		selectedItems: [],
	},

	unmarkItem: {
		selectedItem: null,
	},

	//____________________** other global scope fields **____________________//
	$userRelativeList: [],
	_userRelativeList: 'init',
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
