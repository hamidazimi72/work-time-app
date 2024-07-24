import { PrimaryButton, SVGIcon, SecondaryTable } from '@attom';
import { page_healthInsurance } from '@context';

import { AddItem, AssociatesList, DeleteItem } from './components';

export const InsuredListInfo = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { insuredListInfo } = form;
	const { $insuredItems, addItem: insuredListAddItem, associatesModal, deleteItem, filter, total } = insuredListInfo;
	const { from, size } = filter;

	const actions = page_healthInsurance?.useActions();

	const renderAssociates = () => overWrite({ scope: 'addItem.form.insuredListInfo.associatesModal', value: { show: true } });
	const renderDelete = (item) => overWrite({ scope: 'addItem.form.insuredListInfo.deleteItem', value: { selectedItem: item } });

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'insurerInfo' } });
	};

	const nextStepHandler = () => {
		actions.addItem_insuredListInfo();
		// overWrite({ scope: 'addItem.form', value: { step: 'medicalQuestions' } });
	};

	const changeFilterScope = (values: Partial<typeof filter> = {}) =>
		overWrite({ scope: 'addItem.form.insuredListInfo.filter', value: { ...values } });

	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-[#000] text-[21px] font-bold'>اطلاعات بیمه شده</h2>

			<div className='flex justify-between items-center mb-[-8px]'>
				<h3 className='font-bold'>لیست بیمه شدگان</h3>

				<div className='flex items-center gap-2 text-primary-1 p-2 cursor-pointer' role='button'>
					<SVGIcon width='w-4' textColor='text-primary-1' icon='plus' />
					<span className='text-xs font-semibold' onClick={renderAssociates}>
						افزودن بیمه شده جدید
					</span>
				</div>
			</div>

			<SecondaryTable
				headers={['نام و نام‌خانوادگی', 'کد ملی', 'سن', 'جنسیت', 'نسبت', { children: '', props: { 'data-grow': 0.5 } }]}
				list={$insuredItems}
				listItemRender={(item: (typeof $insuredItems)[0], i) => [
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
										onClick: () => renderDelete(item),
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

			<div className='col-span-3 flex justify-between gap-4'>
				<PrimaryButton
					content='بازگشت'
					onClick={prevStepHandler}
					boxProps={{ className: 'w-40' }}
					elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
					textColor='text-cancel'
				/>
				<PrimaryButton
					content='ذخیره و ادامه'
					disabled={!$insuredItems?.length}
					onClick={nextStepHandler}
					boxProps={{ className: 'w-40' }}
				/>
			</div>

			{associatesModal?.show && <AssociatesList />}
			{insuredListAddItem?.show && <AddItem />}
			{deleteItem?.selectedItem && <DeleteItem />}
		</div>
	);
};
