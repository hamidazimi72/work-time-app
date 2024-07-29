import { Block } from '@attom';
import { page_task } from '@context';

import { FetchItems, AddItem, EditItem, DeleteItem } from './components';

export type TaskProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Task: React.FC<TaskProps> = ({
	//
	boxProps,
}) => {
	const { state } = page_task.useContext();
	const { addItem, editItem, deleteItem } = state;

	// Render Route & Components:
	const addItem_render = addItem.show || null;
	const editItem_render = editItem.selectedItem || null;
	const deleteItem_render = deleteItem.selectedItem || null;

	return (
		<Block boxProps={boxProps}>
			<FetchItems />
			{addItem_render && <AddItem />}
			{editItem_render && <EditItem />}
			{deleteItem_render && <DeleteItem />}
		</Block>
	);
};

export default Task;
