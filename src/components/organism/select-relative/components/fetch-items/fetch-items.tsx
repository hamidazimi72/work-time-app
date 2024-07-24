import { PrimaryCard, SVGIcon, SecondaryTable } from '@attom';
import { organism_selectRelative } from '@context';

export type FetchItemsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FetchItems: React.FC<FetchItemsProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = organism_selectRelative.useContext();
	const { fetchItems } = state;
	const { $fetchItems, filter } = fetchItems;
	const { from, size } = filter;

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });
	const changeSectionScope = (values: Partial<typeof fetchItems> = {}) =>
		overWrite({ scope: 'fetchItems', value: { ...values } });
	const changeFilterScope = (values: Partial<typeof filter> = {}) =>
		overWrite({ scope: 'fetchItems.filter', value: { ...values } });

	const renderMarkItem = () => overWrite({ scope: 'markItem', value: { show: true } });
	const renderUnmarkItem = (item) => overWrite({ scope: 'unmarkItem', value: { selectedItem: item } });

	return (
		<PrimaryCard boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			<div className='flex justify-between items-center'>
				<h3 className='font-bold'>لیست بیمه شدگان</h3>

				<div className='flex items-center gap-2 text-primary-1 p-2 cursor-pointer' role='button'>
					<SVGIcon width='w-4' textColor='text-primary-1' icon='plus' />
					<span className='text-xs font-semibold' onClick={renderMarkItem}>
						افزودن بیمه شده جدید
					</span>
				</div>
			</div>

			<SecondaryTable
				boxProps={{ className: 'mt-[12px]' }}
				headers={['نام و نام‌خانوادگی', 'کد ملی', 'سن', 'جنسیت', 'نسبت', { children: '', props: { 'data-grow': 0.5 } }]}
				list={$fetchItems}
				listItemRender={(item: (typeof $fetchItems)[0], i) => [
					`${item?.relativeFirstName} ${item?.relativeLastName}` ?? '-',
					item?.relativeNationalCode ?? '-',
					item?.age ?? '-',
					(item?.genderKey === 'Male' && 'مرد') || (item?.genderKey === 'Female' && 'زن') || '-',
					item?.relativeTitle ?? '-',
					{
						children: (
							<span className='flex items-center justify-end gap-4 px-4'>
								<SVGIcon
									icon='trash'
									textColor='text-cancel-70 hover:text-cancel'
									boxProps={{
										className: 'cursor-pointer text-background-primary',
										onClick: () => renderUnmarkItem(item),
									}}
								/>
							</span>
						),
						props: { 'data-grow': 0.5 },
					},
				]}
				paginationProps={{
					// total: $fetchItems.length,
					itemIndex: from,
					pageSize: size,
					onChange: (index) => changeFilterScope({ from: index }),
				}}
			/>
		</PrimaryCard>
	);
};
