import { Block, PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimarySelect, PureForm, SVGIcon } from '@attom';
import { page_task } from '@context';
import { useDidMount, useToast } from '@hooks';
import { DateAPI } from '@utils';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_task.useContext();
	const { fetchItems } = state;
	const { filter, $fetchItems, formattedItems } = fetchItems;
	const { isComplete, fromDate, toDate } = filter;

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

	useDidMount(fetchAllItems);

	return (
		<Block boxProps={boxProps}>
			<div className='flex flex-col gap-4'>
				<PureForm boxProps={{ className: 'grid grid-cols-2 gap-2' }}>
					<PrimaryDatePicker
						label='از تاریخ'
						value={fromDate}
						onChange={(e) => overWrite({ value: { fromDate: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimaryDatePicker
						label='تا تاریخ'
						value={toDate}
						onChange={(e) => overWrite({ value: { toDate: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimarySelect
						boxProps={{ className: 'col-span-2' }}
						label='وضعیت'
						item={isComplete}
						options={statusList}
						onChange={(item) => overWrite({ value: { isComplete: item }, scope: 'fetchItems.filter' })}
					/>

					<PrimaryButton boxProps={{ className: 'col-span-2' }} content='جستجو' onClick={fetchAllItems} />
				</PureForm>

				{/* <PrimaryButton content='وظیفه جدید' onClick={renderAdd} /> */}
				<div className='flex flex-col gap-4'>
					{Object?.keys(formattedItems)?.map((item, i) => {
						const subItem = formattedItems[item];
						const dayOfWeek = DateAPI.gregorianToJalaali(new Date(subItem[0]?.date || ''))?.dayName || '';

						return (
							<div key={i} className='flex flex-col gap-2'>
								<span className='text-xs font-light'>
									{item} ({dayOfWeek})
								</span>
								{subItem?.map((subItem, j) => {
									const isCompleted = subItem?.isComplete || false;

									const bgColor = (isCompleted && `bg-green-50`) || `bg-red-50`;

									return (
										<div
											key={j}
											className={`flex justify-between items-center gap-4 p-4 rounded-lg shadow-sm text-sm ${bgColor}`}
										>
											<div className='flex items-baseline gap-4'>
												<PrimaryCheckbox value={subItem?.isComplete} onChange={() => changeStatusHandler(subItem)} />
												<div className='flex flex-col gap-1'>
													<span>{subItem?.title}</span>
													{/* <span className='text-xs font-light'>
														{DateAPI.gregorianToJalaali(new Date(subItem?.date))?.dayName}
														{` - `}
														{DateAPI.gregorianToJalaali(new Date(subItem?.date))?.standardDate}
													</span> */}
												</div>
											</div>
											<div className='flex items-center gap-3'>
												<SVGIcon
													width='w-4'
													icon='edit_regular_rounded'
													textColor='text-cancel'
													boxProps={{ onClick: () => renderEdit(subItem) }}
												/>
												<SVGIcon
													width='w-4'
													icon='trash_regular_rounded'
													textColor='text-cancel'
													boxProps={{ onClick: () => renderDelete(subItem) }}
												/>
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<PrimaryButton
				boxProps={{ className: 'fixed bottom-4 right-4' }}
				elProps={{ className: '!w-[52px] !h-[52px] shadow' }}
				rounded='rounded-full'
				icon={() => <SVGIcon icon='plus_regular_rounded' />}
				onClick={renderAdd}
			/>
		</Block>
	);
};

export default FetchItems;
