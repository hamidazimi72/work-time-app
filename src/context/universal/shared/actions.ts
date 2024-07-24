import { api } from '@services';
import { FileAPI } from '@utils';

export const getUnitList = (parameters?: Action_callbacks & { type: 'branch' | 'agency' | 'marketer' }) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	const type = parameters?.type || null;

	if (!type) {
		if (onFailCB) onFailCB([]);

		return;
	}

	type Res = Service_response<undefined>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res?.data ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$unitList_type_GET(
		{
			onStatus,
			onOk,
			onFail,
		},
		{ param: { type } },
	);
};

export const getDesignList = async (parameters?: Action_callbacks & { type?: string }) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	const type = parameters?.type || null;

	type Res = Service_response<{ data: API_offers_item[] }>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res?.data?.data ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$offer_GET(
		{ onStatus, onOk, onFail },
		{
			query: {
				page: 1,
				take: 40,
			},
		},
	);
};

export const getInsurerList = (parameters?: Action_callbacks) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	type Res = Service_response<API_insurance_list_item[]>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$insuranceLists_insuranceType_GET(
		{
			onStatus,
			onOk,
			onFail,
		},
		{ param: { insuranceType: 'insurer' } },
	);
};

export const getBasicInsuranceList = (parameters?: Action_callbacks) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	type Res = Service_response<API_insurance_list_item[]>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$insuranceLists_insuranceType_GET(
		{
			onStatus,
			onOk,
			onFail,
		},
		{ param: { insuranceType: 'basicInsurance' } },
	);
};

export const getContractTypeList = (parameters?: Action_callbacks) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	type Res = Service_response<API_insurance_list_item[]>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res?.data ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$contract_type_GET(
		{
			onStatus,
			onOk,
			onFail,
		},
		{},
	);
};

export const getCoverTitleList = (parameters?: Action_callbacks) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	type Res = Service_response<API_offer_commitment_title[]>;

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res: Res) => {
		const list = res?.data ?? [];

		if (typeof onOkCB === 'function') onOkCB(list);
	};

	const onFail = async (res?: Res) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$offer_commitment_title_list_GET({ onStatus, onOk, onFail }, {});
};

export const downloadFile = (parameters?: Action_callbacks & { filename?: string }) => {
	const [onOkCB, onFailCB, onStatusCB] = [
		parameters?.okCB ?? null,
		parameters?.failCB ?? null,
		parameters?.statusChangeCB ?? null,
	];

	const filename = parameters?.filename || '';

	const onStatus = (status: Service_status) => {
		if (typeof onStatusCB === 'function') onStatusCB(status);
	};

	const onOk = async (res?: any) => {
		if (!res) return;

		const blob = new Blob([res]);

		const file = await FileAPI._readFile(blob, 'dataURL');

		const link = document.createElement('a');
		link.href = file;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		if (typeof onOkCB === 'function') onOkCB();
	};

	const onFail = async (res?: any) => {
		if (typeof onFailCB === 'function') onFailCB([]);
	};

	api.$uploader_download_filename_GET({ onStatus, onOk, onFail }, { param: { filename } });
};
