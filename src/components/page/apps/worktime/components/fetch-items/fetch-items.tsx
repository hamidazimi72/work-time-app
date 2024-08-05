import { Block, PrimaryButton, PrimaryDatePicker, PureForm, SVGIcon } from '@attom';
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
	const { arrivalDateFrom, arrivalDateTo } = filter;

	const totalHours = Math.floor(totalTime / 1000 / 60 / 60);
	const totalMinutes = new Date(totalTime).getUTCMinutes();

	const actions = page_worktime.useActions();

	const fetchAllItems = () => {
		actions.fetchItems();
	};

	const renderAdd = () => {
		overWrite({ value: { show: true }, scope: 'addItem' });
	};

	const renderEdit = (item: API_worktimes_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'editItem' });
	};

	const renderDelete = (item: API_worktimes_item) => {
		overWrite({ value: { selectedItem: item }, scope: 'deleteItem' });
	};

	useDidMount(fetchAllItems);

	return (
		<Block boxProps={boxProps}>
			<div className='flex flex-col gap-4'>
				<PureForm boxProps={{ className: 'grid grid-cols-2 gap-2' }}>
					<PrimaryDatePicker
						label='از تاریخ'
						value={arrivalDateFrom}
						onChange={(e) => overWrite({ value: { arrivalDateFrom: e }, scope: 'fetchItems.filter' })}
					/>
					<PrimaryDatePicker
						label='تا تاریخ'
						value={arrivalDateTo}
						onChange={(e) => overWrite({ value: { arrivalDateTo: e }, scope: 'fetchItems.filter' })}
					/>

					<PrimaryButton boxProps={{ className: 'col-span-2' }} content='جستجو' onClick={fetchAllItems} />
				</PureForm>
				{/* <PrimaryButton content='ثبت' onClick={renderAdd} /> */}
				<div className='flex flex-col gap-2'>
					{fetchItems?.$fetchItems?.map((item, i) => {
						const isVacation = item?.isVacation || false;
						const isCompleted = item?.arrivalDate && item?.departureDate ? true : false;

						const bgColor = (isVacation && `bg-indigo-50`) || (isCompleted && `bg-green-50`) || `bg-yellow-50`;

						let totalTime_item: number = 0;
						let totalHours_item: number = 0;
						let totalMinutes_item: number = 0;

						if (isCompleted) {
							totalTime_item = new Date(item?.departureDate).getTime() - new Date(item?.arrivalDate).getTime();
							totalHours_item = Math.floor(totalTime_item / 1000 / 60 / 60) || 0;
							totalMinutes_item = new Date(totalTime_item).getUTCMinutes() || 0;
						}

						return (
							<div key={i} className={`flex flex-col gap-4 p-4 rounded-lg shadow-sm text-sm ${bgColor}`}>
								<div className='flex justify-between items-center gap-2'>
									<span>
										{DateAPI.gregorianToJalaali(new Date(item?.arrivalDate))?.standardDate}
										{` `}
										<small>({DateAPI.gregorianToJalaali(new Date(item?.arrivalDate))?.dayName})</small>
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
								<div className='flex gap-2'>
									<span className='flex-1'>
										زمان ورود:{' '}
										{!isVacation ? DateAPI.gregorianToJalaali(new Date(item?.arrivalDate))?.standardTime.slice(0, 5) : '-'}
									</span>
									<span className='flex-1'>
										زمان خروج:{' '}
										{item?.departureDate && !isVacation
											? DateAPI.gregorianToJalaali(new Date(item?.departureDate))?.standardTime.slice(0, 5)
											: '-'}
									</span>
								</div>
								{isCompleted ? (
									<div className='text-[12px] font-light'>
										{totalHours_item > 0 ? `${totalHours_item} ساعت` : null}
										{totalMinutes_item > 0 ? ` ${totalMinutes_item} دقیقه` : null}
									</div>
								) : null}
							</div>
						);
					})}
				</div>
				<div>
					مجموع: {` `}
					{totalHours >= 10 ? totalHours : `0${totalHours}`}:{totalMinutes >= 10 ? totalMinutes : `0${totalMinutes}`}
				</div>
				<div className='mb-24'>روز کاری: {fetchItems?.$fetchItems.filter((item) => item?.departureDate)?.length}</div>
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
