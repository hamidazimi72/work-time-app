import { api } from '@services';

import { useContext } from '.';

export const useActions = () => {
	const { state, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const fetchItems = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { fetchItems } = state;
		const { filter } = fetchItems;
		const { arrivalTimeFrom, arrivalTimeTo, arrivalSort } = filter;

		const arrivalTimeFrom_formatted = new Date(arrivalTimeFrom || '').setHours(0, 0, 0, 0);
		const arrivalTimeTo_formatted = new Date(arrivalTimeTo || '').setHours(23, 59, 59, 0);

		type Res = Service_response<{ info: API_worktimes_item }>;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);

			overWrite({ scope: 'fetchItems', value: { _fetchItems: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			const $fetchItems = res?.body?.info || [];

			let totalTime = 0;
			$fetchItems.forEach((item: API_worktimes_item) => {
				if (!item?.departureTime) return;

				const timeDiffrence = item?.departureTime - item?.arrivalTime;
				totalTime += timeDiffrence;
			});

			overWrite({ scope: 'fetchItems', value: { $fetchItems, totalTime } });
		};

		const onFail = async (res?: Res) => {
			if (typeof onFailCB === 'function') onFailCB(res);

			overWrite({ scope: 'fetchItems', value: { $fetchItems: [], totalTime: 0 } });
		};

		api.$worktimes_GET(
			{ onStatus, onOk, onFail },
			{ query: { arrivalTimeFrom: arrivalTimeFrom_formatted, arrivalTimeTo: arrivalTimeTo_formatted, arrivalSort } },
		);
	};

	const addItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { addItem } = state;
		const { form } = addItem;
		const { arrivalTime, departureTime, isVacation } = form;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'addItem', value: { _addItem: status } });
		};

		const onOk = async (res: any) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			fetchItems();
		};

		const onFail = async (res?: any) => {
			if (typeof onFailCB === 'function') onFailCB(res);
		};

		api.$worktimes_POST(
			{ onStatus, onOk, onFail },
			{ body: { arrivalTime: +arrivalTime, departureTime: +departureTime, isVacation } },
		);
	};

	const editItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { editItem } = state;
		const { form } = editItem;
		const { arrivalTime, departureTime, isVacation, id } = form;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'editItem', value: { _editItem: status } });
		};

		const onOk = async (res: any) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			fetchItems();
		};

		const onFail = async (res?: any) => {
			if (typeof onFailCB === 'function') onFailCB(res);
		};

		api.$worktimes_PUT(
			{ onStatus, onOk, onFail },
			{ body: { id: +id, arrivalTime: +arrivalTime, departureTime: +departureTime, isVacation } },
		);
	};

	const deleteItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { deleteItem } = state;
		const { selectedItem } = deleteItem;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'deleteItem', value: { _deleteItem: status } });
		};

		const onOk = async (res: any) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			fetchItems();
		};

		const onFail = async (res?: any) => {
			if (typeof onFailCB === 'function') onFailCB(res);
		};

		api.$worktimes_id_DELETE({ onStatus, onOk, onFail }, { param: { id: selectedItem?.id ?? 0 } });
	};

	// const fetchItems = (parameters?: Action_callbacks & {}) => {
	// 	const [onOkCB, onFailCB, onStatusCB] = [
	// 		parameters?.okCB ?? null,
	// 		parameters?.failCB ?? null,
	// 		parameters?.statusChangeCB ?? null,
	// 	];

	// 	const { fetchItems } = state;
	// 	const { filter } = fetchItems;
	// 	const { arrivalTimeFrom, arrivalTimeTo } = filter;

	// 	const arrivalTimeFrom_formatted = new Date(arrivalTimeFrom || '').setHours(0, 0, 0, 0);
	// 	const arrivalTimeTo_formatted = new Date(arrivalTimeTo || '').setHours(23, 59, 59, 0);

	// 	const response: item[] = LocalStorageAPI?.getItem('work_time', 'json')
	// 		? Object.values(LocalStorageAPI?.getItem('work_time', 'json'))
	// 		: [];
	// 	const filteredItems = response?.filter((item) => {
	// 		if (arrivalTimeFrom_formatted && arrivalTimeTo_formatted) {
	// 			return +item?.arrivalTime >= +arrivalTimeFrom_formatted && +item?.arrivalTime <= +arrivalTimeTo_formatted;
	// 		}

	// 		if (arrivalTimeFrom_formatted && !arrivalTimeTo_formatted) {
	// 			return +item?.arrivalTime >= +arrivalTimeFrom_formatted;
	// 		}

	// 		if (!arrivalTimeFrom_formatted && arrivalTimeTo_formatted) {
	// 			+item?.arrivalTime <= +arrivalTimeTo_formatted;
	// 		}

	// 		if (!arrivalTimeFrom_formatted && !arrivalTimeTo_formatted) {
	// 			return item;
	// 		}
	// 	});
	// 	const $fetchItems: item[] = filteredItems?.sort((a, b) => b?.arrivalTime - a?.arrivalTime);

	// 	let totalTime = 0;

	// 	$fetchItems.forEach((item) => {
	// 		if (!item?.departureTime) return;

	// 		const timeDiffrence = item?.departureTime - item?.arrivalTime;
	// 		totalTime += timeDiffrence;
	// 	});

	// 	overWrite({ scope: 'fetchItems', value: { $fetchItems, totalTime } });
	// };

	// const addItem = (parameters?: Action_callbacks & {}) => {
	// 	const [onOkCB, onFailCB, onStatusCB] = [
	// 		parameters?.okCB ?? null,
	// 		parameters?.failCB ?? null,
	// 		parameters?.statusChangeCB ?? null,
	// 	];

	// 	const { addItem } = state;
	// 	const { form } = addItem;
	// 	const { arrivalTime, departureTime, isVacation } = form;

	// 	const response = LocalStorageAPI.getItem('work_time', 'json');
	// 	const uuid = uuidv4();
	// 	const data = isVacation
	// 		? { ...response, [uuid]: { id: uuid, arrivalTime, departureTime: '', isVacation: true } }
	// 		: { ...response, [uuid]: { id: uuid, arrivalTime, departureTime, isVacation: false } };
	// 	LocalStorageAPI.setItem('work_time', data, 'json');
	// 	if (onOkCB) onOkCB();
	// 	fetchItems();
	// };

	//--------------------* End Action  *--------------------//

	// const deleteItem = (parameters?: Action_callbacks & {}) => {
	// 	const [onOkCB, onFailCB, onStatusCB] = [
	// 		parameters?.okCB ?? null,
	// 		parameters?.failCB ?? null,
	// 		parameters?.statusChangeCB ?? null,
	// 	];

	// 	const { deleteItem } = state;
	// 	const { selectedItem } = deleteItem;

	// 	const response: item[] = LocalStorageAPI?.getItem('work_time', 'json')
	// 		? Object.values(LocalStorageAPI?.getItem('work_time', 'json'))
	// 		: [];
	// 	const filteredItems: item[] = response?.filter((item) => item?.id !== selectedItem?.id);

	// 	LocalStorageAPI.setItem('work_time', filteredItems, 'json');
	// 	if (onOkCB) onOkCB();
	// 	fetchItems();
	// };

	// const editItem = (parameters?: Action_callbacks & {}) => {
	// 	const [onOkCB, onFailCB, onStatusCB] = [
	// 		parameters?.okCB ?? null,
	// 		parameters?.failCB ?? null,
	// 		parameters?.statusChangeCB ?? null,
	// 	];

	// 	const { editItem } = state;
	// 	const { form } = editItem;
	// 	const { arrivalTime, departureTime, isVacation, id } = form;

	// 	const response = LocalStorageAPI.getItem('work_time', 'json');
	// 	const data = isVacation
	// 		? { ...response, [id]: { id, arrivalTime, departureTime: '', isVacation: true } }
	// 		: { ...response, [id]: { id, arrivalTime, departureTime, isVacation: false } };
	// 	LocalStorageAPI.setItem('work_time', data, 'json');
	// 	if (onOkCB) onOkCB();
	// 	fetchItems();
	// };

	return { fetchItems, addItem, editItem, deleteItem };
};
