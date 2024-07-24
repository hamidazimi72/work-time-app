import { Block } from '@attom';
import { page_months } from '@context';

import { FetchItems, AddItem, EditItem, DeleteItem } from './components';

export type MonthsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Months: React.FC<MonthsProps> = ({
	//
	boxProps,
}) => {
	const { state } = page_months.useContext();
	const { addItem, editItem, deleteItem } = state;

	// Render Route & Components:
	const addItem_render = addItem.show || null;
	const editItem_render = editItem.selectedItem || null;
	const deleteItem_render = deleteItem.selectedItem || null;
	// const fetchItems_render = !addItem_render && !editItem_render;

	return (
		<Block boxProps={boxProps}>
			<FetchItems />
			{addItem_render && <AddItem boxProps={{ className: 'p-4' }} />}
			{editItem_render && <EditItem boxProps={{ className: 'p-4' }} />}
			{deleteItem_render && <DeleteItem boxProps={{ className: 'p-4' }} />}
		</Block>
	);
};

export default Months;
