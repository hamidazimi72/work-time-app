import { PrimaryButton, PrimaryCheckbox, PrimaryModal, SVGIcon, SecondaryTable } from '@attom';
import { page_healthInsurance } from '@context';
import { useDidMount } from '@hooks';

export const AssociatesList = () => {
	const { state, overWrite, initState } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { insuredListInfo } = form;
	const { associatesModal } = insuredListInfo;
	const { _associatesItems, $associatesItems, selectedItems } = associatesModal;

	const onClose = () => {
		overWrite({
			scope: 'addItem.form.insuredListInfo',
			value: { associatesModal: initState.addItem.form.insuredListInfo.associatesModal },
		});
	};

	const toggleSelectedItemsHandler = (item: API_userManagement_relatives_nationalCode_item) => {
		let filteredList: API_userManagement_relatives_nationalCode_item[] = [];

		const selectedItem = selectedItems?.find(value => value?.id === item?.id);

		if (selectedItem?.id) {
			filteredList = selectedItems.filter((value) => value?.id !== item?.id);
		} else {
			filteredList = [...selectedItems, { ...item }];
		}
		overWrite({ scope: 'addItem.form.insuredListInfo.associatesModal', value: { selectedItems: filteredList } });
	};

	const renderAdd = () => overWrite({ scope: 'addItem.form.insuredListInfo.addItem', value: { show: true } });

	const addAssociatesHandler = () => {
		overWrite({ scope: 'addItem.form.insuredListInfo', value: { $insuredItems: [...selectedItems] } });
		onClose()
	};

	// const fakeList = [
	// 	{ id: '1', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '2', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '3', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '4', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '5', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '6', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '7', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '8', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '9', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '10', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '11', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '11', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '12', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '13', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '14', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '15', name: 'علی اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// 	{ id: '16', name: 'رضا اسدی', nationaCode: '1234567890', gender: 'مرد', relation: 'برادر' },
	// ];


	const actions = page_healthInsurance.useActions();

	const fetchAssociatesItemsHandler = () => {
		actions.fetchAssociatesItems_insuredListInfo()
	}
	useDidMount(fetchAssociatesItemsHandler)

	return (
		<PrimaryModal
			onClose={onClose}
			boxProps={{ className: 'rounded-2xl' }}
			backdropDisable
			render={(closeHandler) => (
				<>
					<div className='px-6 py-[21px] border-b border-cancle'>
						<h3 className='font-bold'>بیمه شدگان</h3>
					</div>
					<div className='p-6 pb-0'>
						<SecondaryTable
							boxProps={{ className: 'border-none' }}
							thProps={{ className: '!border-b-0 rounded-b-2xl' }}
							trProps={{ className: 'even:!bg-white border-b border-cancle last:border-b-0' }}
							loading={_associatesItems === 'loading'}
							headers={[{ children: '', props: { 'data-grow': 0.25 } }, 'نام و نام خانوادگی', 'کد ملی', 'جنسیت', 'نسبت']}
							list={$associatesItems}
							listItemRender={(item: (typeof $associatesItems)[0], i) => [
								{
									children: (
										<PrimaryCheckbox
											boxProps={{ className: 'mx-auto' }}
											value={selectedItems.find(value => value?.id === item?.id) ? true : false}
											onChange={() => toggleSelectedItemsHandler(item)}
										/>
									),
									props: { 'data-grow': 0.25 },
								},
								`${item?.relativeFirstName} ${item?.relativeLastName}` || '-',
								item?.relativeNationalCode || '-',
								item?.genderKey === 'Male' && 'مرد' || item?.genderKey === 'Female' && 'زن' || '-',
								item?.relativeTitle || '-',
							]}
						/>
					</div>
					<div className='p-6 flex justify-between items-center gap-2 border-t border-cancle'>
						<div className='flex items-center gap-2 text-primary-1 p-2 cursor-pointer' role='button'>
							<SVGIcon width='w-4' textColor='text-primary-1' icon='plus' />
							<span className='text-xs font-semibold' onClick={renderAdd}>
								افزودن بیمه شده جدید
							</span>
						</div>

						<PrimaryButton
							content='ثبت'
							disabled={!selectedItems?.length}
							onClick={addAssociatesHandler}
							boxProps={{ className: 'w-40' }}
						/>
					</div>
				</>
			)}
		></PrimaryModal>
	);
};
