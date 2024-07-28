import { Block, PrimaryButton, PrimaryDatePicker, PureForm } from '@attom';
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
			<div className='flex flex-col gap-4'>
				<PureForm>
					<PrimaryDatePicker
						value={dateFrom}
						onChange={(e) => overWrite({ value: { dateFrom: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimaryDatePicker value={dateTo} onChange={(e) => overWrite({ value: { dateTo: e }, scope: 'fetchItems.filter' })} />

					<PrimaryButton content='جستجو' onClick={fetchAllItems} />
				</PureForm>
				<PrimaryButton content='هزینه جدید' onClick={renderAdd} />
				<div className='flex flex-col gap-2'>
					{fetchItems?.$fetchItems?.map((item, i) => {
						return (
							<div key={i} className={`flex flex-col gap-4 p-4 rounded-lg shadow-sm text-sm bg-green-50`}>
								<div className='flex justify-between items-center gap-2'>
									<span>
										{item?.category}
										{` `}
										<small>
											({DateAPI.gregorianToJalaali(new Date(item?.date))?.dayName}
											{` - `}
											{DateAPI.gregorianToJalaali(new Date(item?.date))?.standardDate})
										</small>
									</span>
									<div className='flex gap-1'>
										<span className='w-5 h-5 flex justify-center items-center' onClick={() => renderEdit(item)}>
											<i className='fa fa-pencil' />
										</span>
										<span className='w-5 h-5 flex justify-center items-center' onClick={() => renderDelete(item)}>
											<i className='fa fa-trash' />
										</span>
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
				<div className='flex items-center gap-1'>
					مجموع: {` `}
					{MathAPI.seperate(totalCosts)}
					<small>تومان</small>
				</div>
			</div>
		</Block>
	);
};

export default FetchItems;
