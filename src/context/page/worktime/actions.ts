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
			{ body: { arrivalTime: arrivalTime ? +arrivalTime : 0, departureTime: departureTime ? +departureTime : 0, isVacation } },
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
			{
				body: {
					id: +id,
					arrivalTime: arrivalTime ? +arrivalTime : 0,
					departureTime: departureTime ? +departureTime : 0,
					isVacation,
				},
			},
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

	return { fetchItems, addItem, editItem, deleteItem };
};
