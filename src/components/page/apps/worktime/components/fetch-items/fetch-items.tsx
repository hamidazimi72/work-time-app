import { Block, PrimaryButton, PrimaryDatePicker, PureForm } from '@attom';
import { page_worktime } from '@context';
import { useDidMount } from '@hooks';
import { DateAPI } from '@utils';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_worktime.useContext();
	const { fetchItems } = state;
	const { filter, totalTime } = fetchItems;
	const { arrivalTimeFrom, arrivalTimeTo } = filter;

	const totalHours = Math.floor(totalTime / 1000 / 60 / 60);
	const totalMinutes = new Date(totalTime).getUTCMinutes();

	const actions = page_worktime.useActions();

	const fetchAllItems = () => {
		actions.fetchItems();
	};

	const renderAdd = () => {
		overWrite({ value: { show: true }, scope: 'addItem' });
	};

	const renderEdit = (item) => {
		overWrite({ value: { selectedItem: item }, scope: 'editItem' });
	};

	const renderDelete = (item) => {
		overWrite({ value: { selectedItem: item }, scope: 'deleteItem' });
	};

	useDidMount(fetchAllItems);

	return (
		<Block boxProps={boxProps}>
			<div className='p-4 flex flex-col gap-4'>
				<PureForm>
					<PrimaryDatePicker
						value={arrivalTimeFrom}
						onChange={(e) => overWrite({ value: { arrivalTimeFrom: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimaryDatePicker
						value={arrivalTimeTo}
						onChange={(e) => overWrite({ value: { arrivalTimeTo: e }, scope: 'fetchItems.filter' })}
					/>

					<PrimaryButton content='جستجو' onClick={fetchAllItems} />
				</PureForm>
				<PrimaryButton content='ثبت' onClick={renderAdd} />
				<div className='flex flex-col gap-2'>
					{fetchItems?.$fetchItems?.map((item, i) => {
						const isVacation = item?.isVacation || false;
						const isCompleted = (item?.arrivalTime && item?.departureTime) || false;

						const bgColor = (isVacation && `bg-indigo-50`) || (isCompleted && `bg-green-50`) || `bg-yellow-50`;

						return (
							<div key={i} className={`flex flex-col gap-4 p-4 rounded-lg shadow-sm text-sm ${bgColor}`}>
								<div className='flex justify-between items-center gap-2'>
									<span>
										{DateAPI.gregorianToJalaali(new Date(item?.arrivalTime))?.standardDate}
										{` `}
										<small>({DateAPI.gregorianToJalaali(new Date(item?.arrivalTime))?.dayName})</small>
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
								<div className='flex gap-2'>
									<span className='flex-1'>
										زمان ورود:{' '}
										{!isVacation ? DateAPI.gregorianToJalaali(new Date(item?.arrivalTime))?.standardTime.slice(0, 5) : '-'}
									</span>
									<span className='flex-1'>
										زمان خروج:{' '}
										{!isVacation || !item?.departureTime
											? DateAPI.gregorianToJalaali(new Date(item?.departureTime))?.standardTime.slice(0, 5)
											: '-'}
									</span>
								</div>
							</div>
						);
					})}
				</div>
				<div>
					مجموع: {` `}
					{totalHours >= 10 ? totalHours : `0${totalHours}`}:{totalMinutes >= 10 ? totalMinutes : `0${totalMinutes}`}
				</div>
				<div>روز کاری: {fetchItems?.$fetchItems.filter((item) => item?.departureTime)?.length}</div>
			</div>
		</Block>
	);
};

export default FetchItems;
