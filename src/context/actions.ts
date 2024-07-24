import { api } from '@services';

export const getLeaguesConfig = async (config?: Action_callbacks & { id: number }) => {
	const [onOkCB, onFailCB, onStatusCB] = [config?.okCB ?? null, config?.failCB ?? null, config?.statusChangeCB ?? null];

	const id = config?.id || null;
	if (!id) return;

	const onStatus = async (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: any) => {
		const $info = res?.info || [];

		if (typeof onOkCB === 'function') onOkCB($info);
	};

	const onFail = async (res?: {}) => {
		if (typeof onFailCB === 'function') onFailCB();
	};

	api.$serviceSimulator_POST({ onFail, onOk, onStatus }, {});
};
