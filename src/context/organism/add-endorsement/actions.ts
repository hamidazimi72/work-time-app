import { api } from '@services';
import { useContext } from '.';
import { DateAPI } from '@utils';

export const useActions = () => {
	const { state, setState, initState, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const getInsurance = async (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { selectInsurance } = state;
		const { form } = selectInsurance;
		const { insuranceCode } = form;

		type Res = Service_response<API_insurance>;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'selectInsurance', value: { _insurance: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			const $insurance = res?.data || null;

			overWrite({ scope: 'selectInsurance', value: { $insurance } });
		};

		const onFail = async (res?: Res) => {
			if (typeof onFailCB === 'function') onFailCB(res);
			overWrite({ scope: 'selectInsurance', value: { $insurance: null } });
		};

		api.$insurancePolicy_GET(
			{
				onFail,
				onOk: (res) => {
					const data = (res?.data ?? [])?.[0] || null;

					onOk({ data });
				},
				onStatus,
			},
			{
				param: { id: insuranceCode },
			},
		);
		// api.$insurancePolicy_id_GET(
		// 	{
		// 		onFail,
		// 		onOk,
		// 		onStatus,
		// 	},
		// 	{
		// 		param: { id: insuranceCode },
		// 	},
		// );
	};

	const addItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { selectedInsurance } = state;
		const { $insurance, form } = selectedInsurance;
		const {
			type,
			applyDate,
			cause,
			description,
			// type general-information
			hospitalBeneficiary,
			paraBeneficiary,
			contractNum,
			lastInsurance,
			lastInsuranceNum,
			lastInsuranceUniqueCode,
			canIssueIntroduction,
			paymentMode,
			// type member-list
			// type member-list-info
		} = form;

		type Res = Service_response<undefined>;

		const onStatus = async (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'selectedInsurance', value: { _addItem: status } });
		};

		const onOk = async (res: Res) => {
			const $addItem = res?.data || null;

			if (typeof onOkCB === 'function') onOkCB($addItem);
			overWrite({ scope: 'selectedInsurance', value: { $addItem } });
		};

		const onFail = async (res: Res | null) => {
			if (typeof onFailCB === 'function') onFailCB();
		};

		if (type === 'general-information') {
			api.$addendum_insurancePolicyId_generalInformation_POST(
				{ onFail, onOk, onStatus, showOkMessage: true },
				{
					param: {
						insurancePolicyId: $insurance?._id || '',
					},
					body: {
						cause: cause || undefined,
						applyDate: DateAPI.gregorianToJalaali(applyDate)?.standardDate || undefined,
						description: description || undefined,
						lastInsuranceCompany: {
							lastInsuranceNum: lastInsurance ? lastInsuranceNum || undefined : undefined,
							uniqueCode: lastInsurance ? lastInsuranceUniqueCode || undefined : undefined,
						},
						canIssueIntroduction: canIssueIntroduction === null ? undefined : canIssueIntroduction,
						paymentMode: (paymentMode === 'Monthly' && 1) || (paymentMode === 'Yearly' && 2) || undefined,
						paraZinaf: paraBeneficiary || undefined,
						hospitalZinaf: hospitalBeneficiary || undefined,
					},
				},
			);
		}

		if (type === 'member-list') {
		}

		if (type === 'member-list-info') {
		}
	};

	//--------------------* End Action  *--------------------//

	return { getInsurance, addItem };
};
