import { api } from '@services';

import { useContext } from '.';

export const useActions = () => {
	const { state, overWrite, initState } = useContext();

	//--------------------* Start Actions *--------------------//

	const fetchItems = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { fetchItems } = state;
		const { filter } = fetchItems;
		const { dateFrom, dateSort, dateTo } = filter;

		const dateFrom_formatted = new Date(dateFrom || '').setHours(0, 0, 0, 0);
		const dateTo_formatted = new Date(dateTo || '').setHours(23, 59, 59, 0);

		type Res = Service_response<{ info: API_costs_item }>;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);

			overWrite({ scope: 'fetchItems', value: { _fetchItems: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			const $fetchItems = res?.body?.info || [];

			let totalCosts = 0;
			$fetchItems.forEach((item: API_costs_item) => {
				if (!item?.price) return;

				totalCosts += item?.price;
			});

			overWrite({ scope: 'fetchItems', value: { $fetchItems, totalCosts } });
		};

		const onFail = async (res?: Res) => {
			if (typeof onFailCB === 'function') onFailCB(res);

			overWrite({ scope: 'fetchItems', value: { $fetchItems: [], totalCosts: 0 } });
		};

		api.$costs_GET({ onStatus, onOk, onFail }, { query: { dateFrom: dateFrom_formatted, dateTo: dateTo_formatted, dateSort } });
	};

	const addItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { addItem } = state;
		const { form } = addItem;
		const { category, date, description, price } = form;

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

		api.$costs_POST({ onStatus, onOk, onFail }, { body: { category, date, description, price: +price } });
	};

	const editItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { editItem } = state;
		const { form } = editItem;
		const { category, date, description, price, id } = form;

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

		api.$costs_PUT({ onStatus, onOk, onFail }, { body: { id: +id, category, date, description, price: +price } });
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

		api.$costs_id_DELETE({ onStatus, onOk, onFail }, { param: { id: selectedItem?.id ?? 0 } });
	};

	return { fetchItems, addItem, editItem, deleteItem };
};
