import { PrimaryButton, PrimaryCard, SecondaryTable } from '@attom';
import { useDidMount, useRoutes } from '@hooks';
import { page_example } from '@context';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_example.useContext();
	const { fetchItems } = state;
	const { $fetchItems, _fetchItems, filter, total } = fetchItems;
	const { from, size } = filter;

	const actions = page_example.useActions();

	const router = useRoutes();

	const renderAdd = () => {
		overWrite({ scope: 'addItem', value: { show: true } });
		router.insertQuery({ render: 'addItem' });
	};

	const renderDelete = (item) => {
		overWrite({ scope: 'deleteItem', value: { selectedItem: item } });
		router.insertQuery({ render: 'deleteItem', id: item?.ID || '' });
	};

	const renderEdit = (item) => {
		overWrite({ scope: 'editItem', value: { selectedItem: item } });
		router.insertQuery({ render: 'editItem', id: item?.ID || '' });
	};

	const renderGet = (item) => {
		overWrite({ scope: 'getItem', value: { selectedItem: item } });
		router.insertQuery({ render: 'getItem', id: item?.ID || '' });
	};

	const fetchItemsHandler = () => {
		actions.fetchItems();
	};

	const changeSectionScope = (values: Partial<typeof fetchItems> = {}) =>
		overWrite({ scope: 'fetchItems', value: { ...values } });

	const changeFilterScope = (values: Partial<typeof filter> = {}) =>
		overWrite({ scope: 'fetchItems.filter', value: { ...values } });

	useDidMount(fetchItemsHandler, [from, size]);

	const filterItemsHandler = from === 1 ? fetchItemsHandler : () => changeFilterScope({ from: 1 });

	return (
		<PrimaryCard
			boxProps={boxProps}
			elProps={{ className: 'min-h-[400px]' }}
			transparent
			// onClick={() => changeSectionScope({ _fetchItems: _fetchItems === 'loading' ? 'ok' : 'loading' })}
		>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='font-bold text-main'>لیست</h3>
				<PrimaryButton content='افزودن' inlineBlock onClick={renderAdd} disabled={_fetchItems === 'loading'} />
			</div>

			<SecondaryTable
				loading={_fetchItems === 'loading'}
				headers={['key', 'name', 'value', { children: '', props: { 'data-grow': 0.5 } }]}
				list={$fetchItems}
				listItemRender={(item: (typeof $fetchItems)[0], i) => [
					i + 1,
					item?.name,
					item?.value,
					{
						children: (
							<span data-grow='0.5' className='flex items-center justify-center gap-3'>
								<i className='cursor-pointer fa fa-eye' onClick={() => renderGet(item)} />
								<i className='cursor-pointer fa fa-pencil' onClick={() => renderEdit(item)} />
								<i className='cursor-pointer fa fa-trash' onClick={() => renderDelete(item)} />
							</span>
						),
						props: { 'data-grow': 0.5 },
					},
				]}
			/>

			{/* <PrimaryPagination
					boxSize='col-span-12'
					boxSpace='mt-3'
					pageSize={size}
					itemIndex={from}
					total={total || 0}
					onChange={(from) => overWrite({ from }, 'fetchItems.filter')}
				/> */}
		</PrimaryCard>
	);
};
