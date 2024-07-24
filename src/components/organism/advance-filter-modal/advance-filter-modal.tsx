import { useState } from 'react';

import {
	PrimaryButton,
	PrimaryCard,
	PrimaryCheckbox,
	PrimaryDatepicker,
	PrimaryDatepickerProps,
	PrimaryInput,
	PrimaryInputProps,
	PrimarySelect,
	PrimarySelectProps,
	PrimarySkeleton,
	SVGIcon,
	SideModal,
} from '@attom';
import { AdvanceFilterAccordion, SideModalHeader } from '@molecule';

export type AdvanceFilterItem = {
	key: string;
	isValid: boolean;
	displayName: string;
	displayValue: string | number;
	type: 'input' | 'select' | 'datepicker' | 'element';
	inputProps?: PrimaryInputProps;
	selectProps?: PrimarySelectProps;
	datepickerProps?: PrimaryDatepickerProps;
	element?: JSX.Element;
};

export type AdvancedFilterModalProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	onClose?: () => any;
	onApply?: () => any;
	onChangeSelectedFilters?: (filters: string[]) => any;
	filtersConfig?: AdvanceFilterItem[];
	selectedFilters?: string[];

	loading?: boolean;
};

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
	//
	boxProps,

	onClose,
	onApply,
	onChangeSelectedFilters,
	filtersConfig = [],
	selectedFilters = [],

	loading,
}) => {
	const [showMoreSelectedFilters, setShowMoreSelectedFilters] = useState(false);

	const [accordionExpand, setAccordionExpand] = useState<{ [key: string]: boolean }>({
		selectFilters: true,
	});

	const onCloseHandler = (close?: () => any) => {
		if (onClose) {
			if (close) close();
			else onClose();
		}
	};

	const onApplyHandler = () => {
		if (onApply) onApply();
	};

	const selectedFiltersObj = selectedFilters.reduce((result, filterName) => ({ ...result, [filterName]: filterName }), {});

	const onChangeSelectedFiltersHandler = (filterName: string, status: boolean) => {
		if (!filterName) return;
		if (!onChangeSelectedFilters) return;
		if (status) {
			if (selectedFiltersObj[filterName]) return;
			onChangeSelectedFilters([...selectedFilters, filterName]);
		} else if (!status) {
			onChangeSelectedFilters(selectedFilters.filter((name) => name !== filterName));
		}
	};

	const clearSelectedFilters = () => {
		if (onChangeSelectedFilters) onChangeSelectedFilters([]);
	};

	const filtersOBj = (filtersConfig || []).reduce((result, current) => ({ ...result, [current.key]: current }), {});

	return (
		<SideModal
			onClose={onCloseHandler}
			onCloseDisabled={loading}
			hideCloseIcon
			backdropDisable
			render={(closeHandler) => (
				<PrimaryCard
					boxProps={boxProps}
					loading={loading}
					loadingType={() => (
						<div className=''>
							<SideModalHeader space='py-[32px] px-[24px]' title='فیلتر جدول' onClose={closeHandler} />

							{/*  */}
							<div className='py-[32px] px-[24px] gap-[24px] flex flex-col'>
								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
								<PrimarySkeleton boxProps={{ className: 'w-[full] h-[20px]' }} />
							</div>
						</div>
					)}
				>
					<div className='min-h-[100vh] flex flex-col'>
						{/* Header */}
						<SideModalHeader space='py-[32px] px-[24px]' title='فیلتر جدول' onClose={closeHandler} />

						{/*  */}
						<div className='flex flex-col'>
							<AdvanceFilterAccordion
								title='فیلتر های انتخابی'
								titleBadge={selectedFilters.length}
								titleProps={{ className: 'text-cancel' }}
								collapse={!accordionExpand['selectFilters']}
								onChange={(collapse) => setAccordionExpand((PS) => ({ ...PS, selectFilters: !collapse }))}
							>
								<div className='pt-[18px] flex flex-wrap gap-[16px] items-center'>
									{(filtersConfig || []).map((item, i) => {
										const isSelect = Boolean(selectedFiltersObj[item.key] || false);

										return (
											<div
												key={i}
												className='flex items-center gap-2 rounded-full border border-text-tertiary-20 px-3 py-2 cursor-pointer'
												onClick={() => onChangeSelectedFiltersHandler(item?.key, !isSelect)}
											>
												<PrimaryCheckbox value={isSelect} />
												<span className='text-[14px]'>{item?.displayName || ''}</span>
											</div>
										);
									})}
								</div>
							</AdvanceFilterAccordion>

							{selectedFilters.length > 0 && (
								<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
									<div className='flex items-center gap-2'>
										<span className='text-[16px] font-[500] text-cancel'>موارد انتخاب شده</span>
										<span
											className='mr-auto flex items-center gap-2 cursor-pointer text-danger text-[12px]'
											onClick={clearSelectedFilters}
										>
											<SVGIcon icon='trash' width='w-[16px]' />
											<span className=''>حذف تمام فیلتر ها</span>
										</span>
									</div>

									<div className='pt-[18px] flex flex-wrap gap-[16px] items-center'>
										{selectedFilters.map((filterName, i) => {
											if (i > 3 && !showMoreSelectedFilters) return;
											return (
												<div
													key={i}
													className='flex items-center gap-2 rounded-full border border-text-tertiary-20 px-3 py-2 cursor-pointer'
												>
													<span className='text-[14px]'>
														{filtersOBj[filterName]?.displayName || ''}
														{filtersOBj[filterName]?.displayValue ? `: ${filtersOBj[filterName]?.displayValue || ''}` : ''}
													</span>

													<SVGIcon
														icon='close'
														textColor='text-cancel-80 hover:text-danger'
														width='w-[18px]'
														boxProps={{
															className: 'cursor-pointer',
															onClick: () => onChangeSelectedFiltersHandler(filterName, false),
														}}
													/>
												</div>
											);
										})}
									</div>

									{selectedFilters.length > 4 && !showMoreSelectedFilters && (
										<div className='flex items-center pt-[18px]'>
											<span
												className='cursor-pointer text-primary-1 text-[12px] hover:font-[600]'
												onClick={() => setShowMoreSelectedFilters(true)}
											>
												مشاهده بیشتر
											</span>
										</div>
									)}
								</div>
							)}

							{/* Filters Item */}
							<div className='contents'>
								{(filtersConfig || []).map((item, i) => {
									const isSelect = Boolean(selectedFiltersObj[item.key] || false);
									if (!isSelect) return;

									return (
										<AdvanceFilterAccordion
											key={i}
											title={item.displayName}
											isFull={Boolean(item?.displayValue) || item?.displayValue === 0}
											collapse={!accordionExpand[item.key]}
											onChange={(collapse) => setAccordionExpand((PS) => ({ ...PS, [item.key]: !collapse }))}
										>
											<div>
												{item.type === 'input' && <PrimaryInput {...item.inputProps} />}
												{item.type === 'select' && <PrimarySelect {...item.selectProps} />}
												{item.type === 'datepicker' && <PrimaryDatepicker {...item.datepickerProps} />}
												{(item.type === 'element' && item?.element) || null}
											</div>
										</AdvanceFilterAccordion>
									);
								})}
							</div>
						</div>

						{/*  */}
						<div className='mt-auto flex items-center gap-[24px] p-[24px]'>
							<PrimaryButton boxProps={{ className: 'grow' }} content='بستن' color='cancel-outline' onClick={closeHandler} />
							<PrimaryButton
								boxProps={{ className: 'grow' }}
								content='اعمال فیلتر'
								bgColor='bg-primary-2'
								onClick={() => onApplyHandler()}
							/>
						</div>
					</div>
				</PrimaryCard>
			)}
		/>
	);
};
