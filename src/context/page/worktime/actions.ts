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
		const { arrivalDateFrom, arrivalDateTo, arrivalSort } = filter;

		// const arrivalDateFrom_formatted = new Date(arrivalDateFrom || '');
		// const arrivalDateTo_formatted = new Date(arrivalDateTo || '');

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
				if (!item?.departureDate) return;

				const timeDiffrence = new Date(item?.departureDate).getTime() - new Date(item?.arrivalDate).getTime();
				totalTime += timeDiffrence;
			});

			overWrite({ scope: 'fetchItems', value: { $fetchItems, totalTime } });
		};

		const onFail = async (res?: Res) => {
			if (typeof onFailCB === 'function') onFailCB(res);

			overWrite({ scope: 'fetchItems', value: { $fetchItems: [], totalTime: 0 } });
		};

		api.$worktimes_GET({ onStatus, onOk, onFail }, { query: { arrivalDateFrom, arrivalDateTo, arrivalSort } });
	};

	const addItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { addItem } = state;
		const { form } = addItem;
		const { arrivalDate, departureDate, isVacation } = form;

		// const arrivalDate_formatted = new Date(arrivalDate || '').setSeconds(0, 0).toISOString();
		// const departureDate_formatted = new Date(departureDate || '').setSeconds(0, 0).toISOString();

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

		api.$worktimes_POST({ onStatus, onOk, onFail }, { body: { arrivalDate, departureDate, isVacation } });
	};

	const editItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { editItem } = state;
		const { form } = editItem;
		const { arrivalDate, departureDate, isVacation, id } = form;

		// const arrivalDate_formatted = new Date(new Date(arrivalDate || '').setSeconds(0, 0));
		// const departureDate_formatted = new Date(new Date(departureDate || '').setSeconds(0, 0));

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

		api.$worktimes_PUT({ onStatus, onOk, onFail }, { body: { arrivalDate, departureDate, isVacation }, param: { id: +id } });
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
