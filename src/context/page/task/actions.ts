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
		const { isComplete } = filter;
		const isCompleted = isComplete?.value == 'true' ? true : isComplete?.value == 'false' ? false : undefined;

		type Res = Service_response<{ info: API_task_item[] }>;

		const onStatus = (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'fetchItems', value: { _fetchItems: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB(res);

			const $fetchItems = res?.body?.info || [];

			overWrite({ scope: 'fetchItems', value: { $fetchItems } });
		};

		const onFail = async (res?: Res) => {
			if (typeof onFailCB === 'function') onFailCB(res);
			overWrite({ scope: 'fetchItems', value: { $fetchItems: [] } });
		};

		api.$task_GET({ onOk, onFail, onStatus }, { query: { isComplete: isCompleted } });
	};

	const addItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { addItem } = state;
		const { form } = addItem;
		const { isComplete, title } = form;

		type Res = Service_response<{ info: API_task_item }>;

		const onStatus = async (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'addItem', value: { _addItem: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB();

			fetchItems();
		};

		const onFail = async (res: Res | null) => {
			if (typeof onFailCB === 'function') onFailCB();
		};

		api.$task_POST({ onOk, onFail, onStatus }, { body: { isComplete, title } });
	};

	const editItem = (parameters?: Action_callbacks & { item: API_task_item | null }) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const id = parameters?.item?.id;
		const title = parameters?.item?.title || '';
		const isComplete = parameters?.item?.isComplete || false;

		type Res = Service_response<{ info: API_task_item[] }>;

		const onStatus = async (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'editItem', value: { _editItem: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB();

			fetchItems();
		};

		const onFail = async (res: Res | null) => {
			if (typeof onFailCB === 'function') onFailCB();
		};

		if (!id) return;

		api.$task_PUT({ onFail, onOk, onStatus }, { body: { id, isComplete, title } });
	};

	const deleteItem = (parameters?: Action_callbacks & {}) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const { deleteItem } = state;
		const { selectedItem } = deleteItem;

		type Res = Service_response<{ info: API_task_item }>;

		const onStatus = async (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			overWrite({ scope: 'deleteItem', value: { _deleteItem: status } });
		};

		const onOk = async (res: Res) => {
			if (typeof onOkCB === 'function') onOkCB();

			fetchItems();
		};

		const onFail = async (res: Res | null) => {
			if (typeof onFailCB === 'function') onFailCB();
		};

		if (!selectedItem) return;

		api.$task_id_DELETE({ onFail, onOk, onStatus }, { param: { id: selectedItem?.id } });
	};

	//--------------------* End Action  *--------------------//

	return { fetchItems, addItem, editItem, deleteItem };
};
