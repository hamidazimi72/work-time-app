import { PrimaryBreadcrumb, PrimaryButton, PrimaryCard, SVGIcon, SecondaryTable } from '@attom';
import { useDidMount, useRoutes } from '@hooks';
import { page_healthInsurance } from '@context';
import { AdvancedFilter } from './components';
import { Insurance } from '@models';
import { CheckboxCard } from '@molecule';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	render?: boolean;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
	render = true,
}) => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { fetchItems } = state;
	const { $fetchItems, _fetchItems, filter, total, advancedFilter } = fetchItems;
	const { from, size, status } = filter;

	const actions = page_healthInsurance.useActions();

	const router = useRoutes();

	// ______* Render & Change States *______//

	const renderAdd = (item?) => overWrite({ scope: 'addItem', value: { show: true, selectedItem: item || null } });
	const renderDelete = (item) => overWrite({ scope: 'deleteItem', value: { selectedItem: item } });
	const renderEdit = (item) => overWrite({ scope: 'editItem', value: { selectedItem: item } });
	const renderGet = (item) => overWrite({ scope: 'getItem', value: { selectedItem: item } });
	const renderAdvancedFilter = () => overWrite({ scope: 'fetchItems.advancedFilter', value: { show: true } });

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });

	const changeSectionScope = (values: Partial<typeof fetchItems> = {}) =>
		overWrite({ scope: 'fetchItems', value: { ...values } });

	const changeFilterScope = (values: Partial<typeof filter> = {}) =>
		overWrite({ scope: 'fetchItems.filter', value: { ...values } });

	// ______* VARS *______//
	const breadcrumb = [
		{ type: 'back', onClick: () => router.push('/') },
		{ svgIcon: 'home', onClick: () => router.push('/') },
		{ name: 'بیمه نامه ها' },
	];

	const advancedFilterCount = advancedFilter.selectedFilters.length || 0;

	// ______* Services & Actions *______//
	const fetchItemsHandler = () => actions.fetchItems();

	useDidMount(() => {
		fetchItemsHandler();
	}, [from, size, status]);

	if (!render) return null;

	return (
		<PrimaryCard boxProps={boxProps} transparent>
			<div className='px-[20px]'>
				<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />

				<div className='mt-[18px] flex justify-between items-center'>
					<h3 className='font-[700] text-[20px]'>بیمه نامه ها</h3>

					<div className='flex items-center gap-2'>
						<PrimaryButton
							color='cancel-outline'
							inlineBlock
							onClick={renderAdvancedFilter}
							disabled={_fetchItems === 'loading'}
							rounded
						>
							<div className='flex items-center gap-2'>
								<SVGIcon icon='filter' width='w-[24px]' />
								<span>فیلتر جدول</span>
								<span className='rounded-full flex items-center justify-center p-1 min-w-[24px] min-h-[24px] text-[12px] font-bold bg-primary-1 text-white'>
									{advancedFilterCount}
								</span>
							</div>
						</PrimaryButton>

						<PrimaryButton
							content='ثبت بیمه نامه جدید'
							inlineBlock
							onClick={renderAdd}
							disabled={_fetchItems === 'loading'}
							rounded
						/>
					</div>
				</div>

				<div className='mt-[18px] flex flex-wrap items-center gap-3'>
					<span className='text-[14px]'>وضعیت بیمه نامه :</span>

					{[...Insurance.statusList].map((item, i) => {
						return (
							<CheckboxCard
								key={i}
								label={item.name}
								color={Insurance.statusColor[item?.value] || ''}
								value={status === item.value}
								onChange={() => changeFilterScope({ status: status === item.value ? '' : item?.value || '', from: 1 })}
								disabled={_fetchItems === 'loading'}
							/>
						);
					})}
				</div>

				<SecondaryTable
					width='min-w-[1100px]'
					boxProps={{ className: 'mt-[28px]' }}
					loading={_fetchItems === 'loading'}
					headers={[
						{ children: 'کد رایانه بیمه نامه', props: { 'data-grow': '1.5' } },
						'شماره بیمه نامه',
						'کد یکتا',
						'نوع بیمه نامه',
						'بیمه گزار',
						'وضعیت بیمه نامه',
						{ children: '', props: { 'data-grow': 0.5 } },
					]}
					list={$fetchItems}
					listItemRender={(item: (typeof $fetchItems)[0], i) => [
						{ children: item?._id ?? '', props: { 'data-grow': '1.5' } },
						item?.xXx ?? '',
						item?.xXx ?? '',
						Insurance.type[item?.fields?.offerType?.value] || item?.fields?.offerType?.value || '',
						item?.fields?.issuerNationalCode?.value ?? '',
						{
							children: (
								<span className='flex items-center justify-center'>
									<CheckboxCard
										label={Insurance.status[item?.status] || item?.status || 'جاری'}
										color={Insurance.statusColor[item?.status] || ''}
										hideCheckBox
										readOnly
									/>
									{/* <span className='text-[10px] pr-1'>{item?.currentStepNumber || ''}</span> */}
								</span>
							),
						},
						{
							children: (
								<span className='flex items-center justify-end gap-4 px-4'>
									{(!item.status || item.status === 'DRAFT') && (
										<SVGIcon
											icon='stepEllipse'
											textColor='text-cancel-50 hover:text-cancel'
											boxProps={{
												className: 'cursor-pointer text-background-primary',
												onClick: () => renderAdd(item),
											}}
										/>
									)}

									<SVGIcon
										icon='openMenu'
										textColor='text-cancel-70 hover:text-cancel'
										boxProps={{
											className: 'cursor-pointer text-background-primary',
											onClick: () => renderGet(item),
										}}
									/>
								</span>
							),
							props: { 'data-grow': 0.5 },
						},
					]}
					paginationProps={{
						total: total,
						itemIndex: from,
						pageSize: size,
						onChange: (index) => changeFilterScope({ from: index }),
					}}
				/>
			</div>

			{advancedFilter.show && <AdvancedFilter />}
		</PrimaryCard>
	);
};
