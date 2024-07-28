import { Block } from '@attom';
import { page_cost } from '@context';

import { FetchItems, AddItem, EditItem, DeleteItem } from './components';

export type CostProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Cost: React.FC<CostProps> = ({
	//
	boxProps,
}) => {
	const { state } = page_cost.useContext();
	const { addItem, editItem, deleteItem } = state;

	// Render Route & Components:
	const addItem_render = addItem.show || null;
	const editItem_render = editItem.selectedItem || null;
	const deleteItem_render = deleteItem.selectedItem || null;

	return (
		<Block boxProps={boxProps}>
			<FetchItems />
			{addItem_render && <AddItem boxProps={{ className: 'p-4' }} />}
			{editItem_render && <EditItem boxProps={{ className: 'p-4' }} />}
			{deleteItem_render && <DeleteItem boxProps={{ className: 'p-4' }} />}
		</Block>
	);
};

export default Cost;
