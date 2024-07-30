import { api } from '@services';
import { universal_account } from '@context';

import { useContext } from '.';

export const useActions = () => {
	const { state, overWrite } = useContext();

	const universalAccountAction = universal_account.useActions();

	//--------------------* Start Actions *--------------------//

	const registerUser = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { username, password, securityCode } = state;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: '', value: { _status: status } });
		};

		const onOk = async (res: any) => {
			if (res?.statusCode === 200) {
				if (typeof onOkCB === 'function') onOkCB(res);
				const data = res?.body?.info || null;
				const token = res?.body?.token || null;
				universalAccountAction.login({ data, token });
			}
		};

		const onFail = async (res?: any) => {
			if (typeof onFailCB === 'function') onFailCB(res);
		};

		api.$users_username_register_POST(
			{ onStatus, onOk, onFail },
			{ body: { password, securityCode: +securityCode }, param: { username } },
		);
	};

	//--------------------* End Action  *--------------------//

	return { registerUser };
};
