import { useRouter } from 'next/router';

import { Block } from '@attom';
import { useDidUnMount } from '@hooks';
import { page_example } from '@context';

import { FetchItems, AddItem, EditItem, GetItem, DeleteItem } from './components';

export type ExampleProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Example: React.FC<ExampleProps> = ({
	//
	boxProps,
}) => {
	const { state, initState, setState } = page_example.useContext();
	const { addItem, editItem, getItem, deleteItem } = state;

	const { query } = useRouter();

	useDidUnMount(() => {
		setState(initState);
	});

	// Check Queries:
	const exitIdQuery = Boolean(query?.id);
	const exitRenderAddQuery = query?.render === 'addItem';
	const exitRenderEditQuery = query?.render === 'editItem';
	const exitRenderGetQuery = query?.render === 'getItem';
	const exitRenderDeleteQuery = query?.render === 'deleteItem';

	// Render Route & Components:
	const addItem_render = exitRenderAddQuery || addItem.show || null;
	const editItem_render = (exitRenderEditQuery && exitIdQuery) || editItem.selectedItem || null;
	const getItem_render = (exitRenderGetQuery && exitIdQuery) || getItem.selectedItem || null;
	const deleteItem_render = (exitRenderDeleteQuery && exitIdQuery) || deleteItem.selectedItem || null;
	const fetchItems_render = true;
	// const fetchItems_render = !addItem_render && !editItem_render && !getItem_render && !deleteItem_render;

	return (
		<Block boxProps={boxProps}>
			{fetchItems_render && <FetchItems />}
			{addItem_render && <AddItem />}
			{editItem_render && <EditItem />}
			{getItem_render && <GetItem />}
			{deleteItem_render && <DeleteItem />}
		</Block>
	);
};

export default Example;
