// import { useState } from 'react';

// import {
// 	PrimaryButton,
// 	PrimaryCard,
// 	PrimaryCheckbox,
// 	PrimaryDatepicker,
// 	PrimaryDatepickerProps,
// 	PrimaryInput,
// 	PrimaryInputProps,
// 	PrimarySelect,
// 	PrimarySelectProps,
// 	PrimarySkeleton,
// 	SVGIcon,
// 	SideModal,
// } from '@attom';
// import { page_healthContract } from '@context';
// import { AdvanceFilterAccordion, SideModalHeader } from '@molecule';

// export type AdvancedFilterProps = {
// 	boxProps?: React.HTMLAttributes<HTMLDivElement>;
// };

// export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
// 	//
// 	boxProps,
// }) => {
// 	const { state, overWrite } = page_healthContract.useContext();
// 	const { fetchItems } = state;
// 	const { _fetchItems, advancedFilter } = fetchItems;

// 	const actions = page_healthContract.useActions();

// 	const [draftAdvancedFilter, setDraftAdvancedFilter] = useState(advancedFilter);

// 	const {
// 		show,
// 		selectedFilters,

// 		contractType,
// 		contractNum,
// 		contractStatus,
// 		contractPartyId,
// 		startDate,
// 		endDate,
// 		sodurUnit,
// 	} = draftAdvancedFilter;

// 	const [showMoreSelectedFilters, setShowMoreSelectedFilters] = useState(false);

// 	const [accordionExpand, setAccordionExpand] = useState({
// 		selectFilters: true,
// 		contractType: false,
// 		contractNum: false,
// 		contractStatus: false,
// 		contractPartyId: false,
// 		startDate: false,
// 		endDate: false,
// 		sodurUnit: false,
// 	});

// 	const changeSectionScope = (values: Partial<typeof fetchItems> = {}) =>
// 		overWrite({ scope: 'fetchItems', value: { ...values } });
// 	const changeScopeScope = (values: Partial<typeof advancedFilter> = {}) =>
// 		overWrite({ scope: 'fetchItems.advancedFilter', value: { ...values } });

// 	const onClose = () => {
// 		changeScopeScope({ show: false });
// 	};

// 	const onApply = () => {
// 		changeScopeScope({ ...draftAdvancedFilter });

// 		setTimeout(() => {
// 			actions.fetchItems();
// 		}, 500);
// 	};

// 	const selectedFiltersObj = selectedFilters.reduce((result, current) => ({ ...result, [current]: current }), {});

// 	const changeSelectedFilter = (filterName: string, status: boolean) => {
// 		if (!filterName) return;
// 		if (status) {
// 			if (selectedFiltersObj[filterName]) return;
// 			setDraftAdvancedFilter((PS) => ({ ...PS, selectedFilters: [...selectedFilters, filterName] }));
// 		} else if (!status) {
// 			setDraftAdvancedFilter((PS) => ({ ...PS, selectedFilters: selectedFilters.filter((name) => name !== filterName) }));
// 		}
// 	};

// 	const clearSelectedFilters = () => {
// 		setDraftAdvancedFilter((PS) => ({ ...PS, selectedFilters: [] }));
// 	};

// 	type Filter = {
// 		name: string;
// 		isSelect: boolean;
// 		isExpand: boolean;
// 		isValid: boolean;
// 		displayValue: string | number;
// 		type: 'input' | 'select' | 'datepicker';
// 		inputProps?: PrimaryInputProps;
// 		selectProps?: PrimarySelectProps;
// 		datepickerProps?: PrimaryDatepickerProps;
// 	};

// 	type FilterNameType = Exclude<keyof typeof advancedFilter, 'selectedFilters' | 'show'>;

// 	const filters: { [key in FilterNameType]: Filter } = {
// 		contractType: {
// 			name: 'نوع بیمه نامه',
// 			isSelect: selectedFiltersObj['contractType'] || false,
// 			isExpand: accordionExpand['contractType'] || false,
// 			isValid: true,
// 			displayValue: contractType,
// 			type: 'input',
// 			inputProps: {
// 				placeholder: 'نوع بیمه نامه را وارد کنید',
// 				value: contractType,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, contractType: value })),
// 			},
// 		},
// 		contractNum: {
// 			name: 'شماره قرارداد',
// 			isSelect: selectedFiltersObj['contractNum'] || false,
// 			isExpand: accordionExpand['contractNum'] || false,
// 			isValid: true,
// 			displayValue: contractNum,
// 			type: 'input',
// 			inputProps: {
// 				placeholder: 'شماره قرارداد را وارد کنید',
// 				value: contractNum,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, contractNum: value })),
// 			},
// 		},
// 		contractStatus: {
// 			name: 'وضعیت قرارداد',
// 			isSelect: selectedFiltersObj['contractStatus'] || false,
// 			isExpand: accordionExpand['contractStatus'] || false,
// 			isValid: true,
// 			displayValue: contractStatus,
// 			type: 'input',
// 			inputProps: {
// 				placeholder: 'وضعیت قرارداد را وارد کنید',
// 				value: contractStatus,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, contractStatus: value })),
// 			},
// 		},
// 		contractPartyId: {
// 			name: 'طرف قرارداد',
// 			isSelect: selectedFiltersObj['contractPartyId'] || false,
// 			isExpand: accordionExpand['contractPartyId'] || false,
// 			isValid: true,
// 			displayValue: contractPartyId,
// 			type: 'input',
// 			inputProps: {
// 				placeholder: 'طرف قرارداد را وارد کنید',
// 				value: contractPartyId,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, contractPartyId: value })),
// 			},
// 		},
// 		startDate: {
// 			name: 'تاریخ شروع قرارداد',
// 			isSelect: selectedFiltersObj['startDate'] || false,
// 			isExpand: accordionExpand['startDate'] || false,
// 			isValid: true,
// 			displayValue: startDate,
// 			type: 'datepicker',
// 			datepickerProps: {
// 				placeholder: 'تاریخ شروع قرارداد را وارد کنید',
// 				value: startDate,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, startDate: value })),
// 			},
// 		},
// 		endDate: {
// 			name: 'تاریخ پایان قرارداد',
// 			isSelect: selectedFiltersObj['endDate'] || false,
// 			isExpand: accordionExpand['endDate'] || false,
// 			isValid: true,
// 			displayValue: endDate,
// 			type: 'datepicker',
// 			datepickerProps: {
// 				placeholder: 'تاریخ پایان قرارداد را وارد کنید',
// 				value: endDate,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, endDate: value })),
// 			},
// 		},
// 		sodurUnit: {
// 			name: 'واحد صدور',
// 			isSelect: selectedFiltersObj['sodurUnit'] || false,
// 			isExpand: accordionExpand['sodurUnit'] || false,
// 			isValid: true,
// 			displayValue: sodurUnit,
// 			type: 'input',
// 			inputProps: {
// 				placeholder: 'واحد صدور را وارد کنید',
// 				value: sodurUnit,
// 				onChange: (value) => setDraftAdvancedFilter((PS) => ({ ...PS, sodurUnit: value })),
// 			},
// 		},
// 	};

// 	return (
// 		<SideModal
// 			onClose={onClose}
// 			onCloseDisabled={_fetchItems === 'loading'}
// 			hideCloseIcon
// 			backdropDisable
// 			render={(closeHandler) => (
// 				<PrimaryCard
// 					boxProps={boxProps}
// 					loading={_fetchItems === 'loading'}
// 					loadingType={() => (
// 						<div className=''>
// 							<SideModalHeader space='py-[32px] px-[24px]' title='فیلتر جدول' onClose={closeHandler} />

// 							{/*  */}
// 							<div className='py-[32px] px-[24px] gap-[24px] flex flex-col'>
// 								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
// 								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
// 								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
// 							</div>
// 						</div>
// 					)}
// 				>
// 					<div className='min-h-[100vh] flex flex-col'>
// 						{/* Header */}
// 						<SideModalHeader space='py-[32px] px-[24px]' title='فیلتر جدول' onClose={closeHandler} />

// 						{/*  */}
// 						<div className='flex flex-col'>
// 							<AdvanceFilterAccordion
// 								title='فیلتر های انتخابی'
// 								titleBadge={selectedFilters.length}
// 								titleProps={{ className: 'text-cancel' }}
// 								collapse={!accordionExpand['selectFilters']}
// 								onChange={(collapse) => setAccordionExpand((PS) => ({ ...PS, selectFilters: !collapse }))}
// 							>
// 								<div className='pt-[18px] flex flex-wrap gap-[16px] items-center'>
// 									{Object.entries(filters).map(([key, item], i) => (
// 										<div
// 											key={i}
// 											className='flex items-center gap-2 rounded-full border border-text-tertiary-20 px-3 py-2 cursor-pointer'
// 											onClick={() => changeSelectedFilter(key, !item.isSelect)}
// 										>
// 											<PrimaryCheckbox value={item?.isSelect} />
// 											<span className='text-[14px]'>{item?.name || ''}</span>
// 										</div>
// 									))}
// 								</div>
// 							</AdvanceFilterAccordion>

// 							{selectedFilters.length > 0 && (
// 								<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
// 									<div className='flex items-center gap-2'>
// 										<span className='text-[16px] font-[500] text-cancel'>موارد انتخاب شده</span>
// 										<span
// 											className='mr-auto flex items-center gap-2 cursor-pointer text-danger text-[12px]'
// 											onClick={clearSelectedFilters}
// 										>
// 											<SVGIcon icon='trash' width='w-[16px]' />
// 											<span className=''>حذف تمام فیلتر ها</span>
// 										</span>
// 									</div>

// 									<div className='pt-[18px] flex flex-wrap gap-[16px] items-center'>
// 										{selectedFilters.map((filterName, i) => {
// 											if (i > 3 && !showMoreSelectedFilters) return;
// 											return (
// 												<div
// 													key={i}
// 													className='flex items-center gap-2 rounded-full border border-text-tertiary-20 px-3 py-2 cursor-pointer'
// 												>
// 													<span className='text-[14px]'>
// 														{filters[filterName]?.name || ''} : {filters[filterName]?.displayValue || '-'}
// 													</span>

// 													<SVGIcon
// 														icon='close'
// 														textColor='text-cancel-80 hover:text-danger'
// 														width='w-[18px]'
// 														boxProps={{ className: 'cursor-pointer', onClick: () => changeSelectedFilter(filterName, false) }}
// 													/>
// 												</div>
// 											);
// 										})}
// 									</div>

// 									{selectedFilters.length > 4 && !showMoreSelectedFilters && (
// 										<div className='flex items-center pt-[18px]'>
// 											<span
// 												className='cursor-pointer text-primary-1 text-[12px] hover:font-[600]'
// 												onClick={() => setShowMoreSelectedFilters(true)}
// 											>
// 												مشاهده بیشتر
// 											</span>
// 										</div>
// 									)}
// 								</div>
// 							)}

// 							{/* Filters Item */}
// 							<div className='contents'>
// 								{Object.entries(filters).map(([filterName, item], i) => {
// 									if (!item.isSelect) return;

// 									return (
// 										<AdvanceFilterAccordion
// 											key={i}
// 											title={item.name}
// 											isFull={Boolean(item?.displayValue) || item?.displayValue === 0}
// 											collapse={!accordionExpand[filterName]}
// 											onChange={(collapse) => setAccordionExpand((PS) => ({ ...PS, [filterName]: !collapse }))}
// 										>
// 											<div>
// 												{item.type === 'input' && <PrimaryInput {...item.inputProps} />}
// 												{item.type === 'select' && <PrimarySelect {...item.selectProps} />}
// 												{item.type === 'datepicker' && <PrimaryDatepicker {...item.datepickerProps} />}
// 											</div>
// 										</AdvanceFilterAccordion>
// 									);
// 								})}
// 							</div>
// 						</div>

// 						{/*  */}
// 						<div className='mt-auto flex items-center gap-[24px] p-[24px]'>
// 							<PrimaryButton boxProps={{ className: 'grow' }} content='بستن' color='cancel-outline' onClick={onClose} />
// 							<PrimaryButton
// 								boxProps={{ className: 'grow' }}
// 								content='اعمال فیلتر'
// 								bgColor='bg-primary-2'
// 								onClick={() => {
// 									onApply();
// 									onClose();
// 								}}
// 							/>
// 						</div>
// 					</div>
// 				</PrimaryCard>
// 			)}
// 		/>
// 	);
// };
