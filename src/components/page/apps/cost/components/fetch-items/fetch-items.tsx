import { Block, PrimaryButton, PrimaryDatePicker, PureForm, SVGIcon } from '@attom';
import { page_cost } from '@context';
import { useDidMount } from '@hooks';
import { DateAPI, MathAPI } from '@utils';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_cost.useContext();
	const { fetchItems } = state;
	const { filter, totalCosts } = fetchItems;
	const { dateFrom, dateSort, dateTo } = filter;

	const actions = page_cost.useActions();

	const fetchAllItems = () => {
		actions.fetchItems();
	};

	const renderAdd = () => {
		overWrite({ value: { show: true }, scope: 'addItem' });
	};

	const renderEdit = (item: API_costs_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'editItem' });
	};

	const renderDelete = (item: API_costs_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'deleteItem' });
	};

	useDidMount(fetchAllItems);

	return (
		<Block boxProps={boxProps}>
			<div className='pb-24'>
				<PureForm boxProps={{ className: 'grid grid-cols-2 gap-x-2 gap-y-2 mb-4' }}>
					<PrimaryDatePicker
						label='از تاریخ'
						value={dateFrom}
						onChange={(e) => overWrite({ value: { dateFrom: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimaryDatePicker
						label='تا تاریخ'
						value={dateTo}
						onChange={(e) => overWrite({ value: { dateTo: e }, scope: 'fetchItems.filter' })}
					/>

					<PrimaryButton boxProps={{ className: 'col-span-2' }} content='جستجو' onClick={fetchAllItems} />
				</PureForm>
				{/* <PrimaryButton content='هزینه جدید' onClick={renderAdd} /> */}

				<div className='flex flex-col gap-2'>
					{fetchItems?.$fetchItems?.map((item, i) => {
						return (
							<div key={i} className={`flex flex-col gap-4 p-4 rounded-lg shadow-sm text-sm bg-green-50`}>
								<div className='flex justify-between items-center gap-2'>
									<span>
										{item?.category}
										{` `}
										<small>
											({DateAPI.gregorianToJalaali(new Date(item?.date || ''))?.dayName}
											{` - `}
											{DateAPI.gregorianToJalaali(new Date(item?.date || ''))?.standardDate})
										</small>
									</span>
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
								<div className='flex items-center gap-1'>
									مبلغ: {MathAPI.seperate(item?.price)}
									<small>تومان</small>
								</div>
								{item?.description && <div className='flex gap-1 text-xs font-light'>توضیحات: {item?.description}</div>}
							</div>
						);
					})}
				</div>
			</div>
			<PrimaryButton
				boxProps={{ className: 'fixed bottom-20 right-4 opacity-75' }}
				elProps={{ className: '!w-12 !h-12 shadow' }}
				rounded='rounded-full'
				icon={() => <SVGIcon icon='plus_regular_rounded' />}
				onClick={renderAdd}
			/>
			<div className='h-12 bg-sky-200 rounded-3xl flex items-center gap-1 fixed bottom-20 left-4 px-4 text-sm opacity-60 hover:opacity-100'>
				<small>مجموع هزینه‌ها:</small> {` `}
				{MathAPI.seperate(totalCosts)}
				<small>تومان</small>
			</div>
		</Block>
	);
};

export default FetchItems;
