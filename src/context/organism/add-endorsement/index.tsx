import { Endorsement, Insurance } from '@models';

import { createContext } from '../../create-context';

export type InitState = {
	selectInsurance: {
		$insurance: API_insurance_list_item | null;
		_insurance: Service_status;

		form: {
			insuranceCode: string;
		};
	};

	selectedInsurance: {
		$insurance: API_insurance_list_item | null | undefined;

		$addItem: { [key: string]: any } | null;
		_addItem: Service_status;

		form: {
			type: keyof typeof Endorsement.type | '';
			applyDate: string;
			cause: keyof typeof Endorsement.cause | '';
			description: string;
			// type general-information
			hospitalBeneficiary: string;
			paraBeneficiary: string;
			contractNum: string;
			lastInsurance: API_insurance_list_item | null;
			lastInsuranceNum: string;
			lastInsuranceUniqueCode: string;
			canIssueIntroduction: boolean | null;
			paymentMode: keyof typeof Insurance.paymentMode | '';
			// type member-list
			// type member-list-info
		};
	};

	//____________________** other global scope fields **____________________//
	$basicInsuranceList: API_insurance_list_item[];
	_basicInsuranceList: Service_status;
};

export const initState: InitState = {
	selectInsurance: {
		$insurance: null,
		_insurance: 'init',

		form: {
			insuranceCode: '',
		},
	},

	selectedInsurance: {
		$insurance: undefined,

		$addItem: null,
		_addItem: 'init',

		form: {
			type: '',
			applyDate: '',
			cause: '',
			description: '',
			// type general-information
			hospitalBeneficiary: '',
			paraBeneficiary: '',
			contractNum: '',
			lastInsurance: null,
			lastInsuranceNum: '',
			lastInsuranceUniqueCode: '',
			canIssueIntroduction: null,
			paymentMode: '',
			// type member-list
			// type member-list-info
		},
	},

	//____________________** other global scope fields **____________________//
	$basicInsuranceList: [],
	_basicInsuranceList: 'init',
};

export const { useContext, Provider } = createContext<InitState>(initState);

export * from './actions';
