import { Block, PrimaryButton, PrimaryCheckbox, PrimarySelect, PureForm, SVGIcon } from '@attom';
import { page_task } from '@context';
import { useDidMount, useToast } from '@hooks';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_task.useContext();
	const { fetchItems } = state;
	const { filter } = fetchItems;
	const { isComplete } = filter;

	const actions = page_task.useActions();

	const { showToast } = useToast();

	const fetchAllItems = () => {
		actions.fetchItems();
	};

	const statusList = [
		{ name: 'همه موارد', value: 'undefined' },
		{ name: 'انجام شده', value: 'true' },
		{ name: 'انجام نشده', value: 'false' },
	];

	const renderAdd = () => {
		overWrite({ value: { show: true }, scope: 'addItem' });
	};

	const changeStatusHandler = (item: API_task_item) => {
		actions.editItem({
			okCB(res) {
				showToast({ message: 'وضعیت وظیفه با موفقیت به‌روز گردید!', showIcon: true, type: 'success' });
			},
			item: { ...item, isComplete: !item?.isComplete },
		});
	};

	const renderEdit = (item: API_task_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'editItem' });
	};

	const renderDelete = (item: API_task_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'deleteItem' });
	};

	useDidMount(() => {
		fetchAllItems();
	}, [isComplete]);

	return (
		<Block boxProps={boxProps}>
			<div className='flex flex-col gap-4'>
				<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
					<PrimarySelect
						label='وضعیت'
						item={isComplete}
						options={statusList}
						onChange={(item) => overWrite({ value: { isComplete: item }, scope: 'fetchItems.filter' })}
					/>

					{/* <PrimaryButton content='جستجو' onClick={fetchAllItems} /> */}
				</PureForm>

				<PrimaryButton content='وظیفه جدید' onClick={renderAdd} />
				<div className='flex flex-col gap-2'>
					{fetchItems?.$fetchItems?.map((item, i) => {
						const isCompleted = item?.isComplete || false;

						const bgColor = (isCompleted && `bg-green-50`) || `bg-red-50`;

						return (
							<div key={i} className={`flex justify-between items-center gap-4 p-4 rounded-lg shadow-sm text-sm ${bgColor}`}>
								<div className='flex items-center gap-2'>
									<PrimaryCheckbox value={item?.isComplete} onChange={() => changeStatusHandler(item)} />
									<span>{item?.title}</span>
								</div>
								<div className='flex items-center gap-3'>
									<SVGIcon
										width='w-4'
										icon='edit_regular_rounded'
										textColor='text-cancel'
										boxProps={{ onClick: () => renderEdit(item) }}
									/>
									<SVGIcon
										width='w-4'
										icon='trash_regular_rounded'
										textColor='text-cancel'
										boxProps={{ onClick: () => renderDelete(item) }}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Block>
	);
};

export default FetchItems;
