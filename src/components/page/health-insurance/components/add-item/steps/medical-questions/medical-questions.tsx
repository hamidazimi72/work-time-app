import { PrimaryButton, SecondaryTable } from '@attom';
import { page_healthInsurance } from '@context';
import { HealthQuestionnarie } from '@models';
import { CheckboxCard } from '@molecule';

// import { AddItem, AssociatesList, DeleteItem } from './components';

export const MedicalQuestions = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { medicalQuestions } = form;
	const { $personsItems, _personsItems, healthQuestionnaire, filter, total } = medicalQuestions;
	const { from, size } = filter;

	const renderQuestionnaire = () =>
		overWrite({ scope: 'addItem.form.medicalQuestions.healthQuestionnaire', value: { show: true } });
	// const renderDelete = (item) => overWrite({ scope: 'addItem.form.insuredListInfo.deleteItem', value: { selectedItem: item } });

	const changeFilterScope = (values: Partial<typeof filter> = {}) =>
		overWrite({ scope: 'addItem.form.medicalQuestions.filter', value: { ...values } });

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'insuredListInfo' } });
	};

	const nextStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'attachments' } });
	};

	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-[#000] text-[21px] font-bold'>سوالات پزشکی</h2>
			<h3 className='h-[35vh] text-xl flex justify-center items-center animate-pulse'>در حال توسعه ...</h3>

			{/* <SecondaryTable
				loading={_personsItems === 'loading'}
				headers={['نام و نام‌خانوادگی', 'کد ملی', 'سن', 'وضعیت پرسشنامه سلامت', 'پرسشنامه سلامت']}
				list={$personsItems}
				listItemRender={(item: (typeof $personsItems)[0], i) => [
					`${item?.firstname} ${item?.lastname}` ?? 'تست',
					item?.nationalCode ?? 'تست',
					item?.age ?? 'تست',
					{
						children: (
							<span className='flex items-center justify-center'>
								<CheckboxCard
									label={(item?.status === 'COMPLETED' && 'تکمیل شده') || (item?.status === 'UNCOMPLETED' && 'تکمیل نشده') || ''}
									color={(item?.status === 'COMPLETED' && 'success') || (item?.status === 'UNCOMPLETED' && 'warning') || ''}
									hideCheckBox
									readOnly
								/>
							</span>
						),
					},
					,
					{
						children: (
							<span className='text-xs font-semibold text-primary-2 cursor-pointer' onClick={renderQuestionnaire}>
								مشاهده
							</span>
						),
					},
				]}
				paginationProps={{
					total: total,
					itemIndex: from,
					pageSize: size,
					onChange: (index) => changeFilterScope({ from: index }),
				}}
			/> */}

			<div className='col-span-3 flex justify-between gap-4 mt-20'>
				<PrimaryButton
					content='بازگشت'
					disabled={_personsItems === 'loading'}
					onClick={prevStepHandler}
					boxProps={{ className: 'w-40' }}
					elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
					textColor='text-cancel'
				/>
				<PrimaryButton
					content='ذخیره و ادامه'
					// disabled={_personsItems === 'loading' || $personsItems?.filter((item) => item?.status === 'UNCOMPLETED').length > 0}
					onClick={nextStepHandler}
					boxProps={{ className: 'w-40' }}
				/>
			</div>

			{/* {associatesModal?.show && <AssociatesList />}
			{insuredListAddItem?.show && <AddItem />}
			{deleteItem?.selectedItem && <DeleteItem />} */}
		</div>
	);
};
