import { api } from '@services';

import { useContext } from '.';

export const useActions = () => {
	const { state, setState, initState, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	// const getInsurance = async (parameters?: Action_callbacks & {}) => {
	// 	const [onOkCB, onFailCB, onStatusCB] = [
	// 		parameters?.okCB ?? null,
	// 		parameters?.failCB ?? null,
	// 		parameters?.statusChangeCB ?? null,
	// 	];

	// 	const { selectInsurance } = state;
	// 	const { form } = selectInsurance;
	// 	const { insuranceCode } = form;

	// 	type Res = Service_response<API_insurance>;

	// 	const onStatus = (status: Service_status) => {
	// 		if (typeof onStatusCB === 'function') onStatusCB(status);
	// 		overWrite({ scope: 'selectInsurance', value: { _insurance: status } });
	// 	};

	// 	const onOk = async (res: Res) => {
	// 		if (typeof onOkCB === 'function') onOkCB(res);

	// 		const $insurance = res?.data || null;

	// 		overWrite({ scope: 'selectInsurance', value: { $insurance } });
	// 	};

	// 	const onFail = async (res?: Res) => {
	// 		if (typeof onFailCB === 'function') onFailCB(res);
	// 		overWrite({ scope: 'selectInsurance', value: { $insurance: null } });
	// 	};

	// 	api.$insurancePolicy_GET(
	// 		{
	// 			onFail,
	// 			onOk: (res) => {
	// 				const data = (res?.data ?? [])?.[0] || null;

	// 				onOk({ data });
	// 			},
	// 			onStatus,
	// 		},
	// 		{
	// 			param: { id: insuranceCode },
	// 		},
	// 	);
	// 	// api.$insurancePolicy_id_GET(
	// 	// 	{
	// 	// 		onFail,
	// 	// 		onOk,
	// 	// 		onStatus,
	// 	// 	},
	// 	// 	{
	// 	// 		param: { id: insuranceCode },
	// 	// 	},
	// 	// );
	// };

	//--------------------* End Action  *--------------------//

	return {};
};
