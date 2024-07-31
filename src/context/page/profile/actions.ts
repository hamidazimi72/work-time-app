import { api } from '@services';

import { useContext } from '.';
import { LocalStorageAPI } from '@utils';

export const useActions = () => {
	const { state, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const resetPasswordUser = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { resetPassword } = state;
		const { newPassword, password } = resetPassword;

		const username = LocalStorageAPI.getItem('_account', 'json')?.username || '';

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'resetPassword', value: { _status: status } });
		};

		const onOk = async (res: any) => {
			if (res?.statusCode === 200) {
				if (typeof onOkCB === 'function') onOkCB(res);
			}
		};

		const onFail = async (res?: any) => {
			if (typeof onFailCB === 'function') onFailCB(res);
		};

		api.$users_username_reset_password_POST({ onStatus, onOk, onFail }, { body: { password, newPassword }, param: { username } });
	};

	//--------------------* End Action  *--------------------//

	return { resetPasswordUser };
};
