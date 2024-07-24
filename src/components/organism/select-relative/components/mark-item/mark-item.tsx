import { PrimaryButton, PrimaryCheckbox, PrimaryModal, SVGIcon, SecondaryTable } from '@attom';
import { organism_selectRelative } from '@context';
import { useDidMount } from '@hooks';

export const MarkItem = () => {
	const { state, overWrite, initState } = organism_selectRelative.useContext();
	const { markItem, _userRelativeList, $userRelativeList } = state;
	const { selectedItems } = markItem;

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });
	const changeSectionScope = (values: Partial<typeof markItem> = {}) => overWrite({ scope: 'markItem', value: { ...values } });
	const changeFetchItemsScope = (values: Partial<typeof state.fetchItems> = {}) =>
		overWrite({ scope: 'fetchItems', value: { ...values } });

	const onClose = () => {
		changeStateScope({ markItem: initState.markItem });
	};

	const actions = organism_selectRelative.useActions();

	const getUserRelativeList = () => {
		// actions.fetchAssociatesItems_insuredListInfo()
	};
	useDidMount(() => {
		getUserRelativeList();
	});

	useDidMount(() => {
		changeSectionScope({ selectedItems: state.fetchItems.$fetchItems || [] });
	});

	const renderAddRelative = () => {};

	const toggleMarkItem = (item: API_userManagement_relatives_nationalCode_item) => {
		// let filteredList: API_userManagement_relatives_nationalCode_item[] = [];
		// const selectedItem = selectedItems?.find(value => value?.id === item?.id);
		// if (selectedItem?.id) {
		// 	filteredList = selectedItems.filter((value) => value?.id !== item?.id);
		// } else {
		// 	filteredList = [...selectedItems, { ...item }];
		// }
		// overWrite({ scope: 'markItem.form.insuredListInfo.associatesModal', value: { selectedItems: filteredList } });
	};

	return (
		<PrimaryModal
			onClose={onClose}
			boxProps={{ className: 'rounded-2xl' }}
			backdropDisable
			render={(closeHandler) => (
				<div>
					<div className='px-6 py-[21px] border-b border-cancle'>
						<h3 className='font-bold'>بیمه شدگان</h3>
					</div>
					<div className='p-6 pb-0'>
						<SecondaryTable
							boxProps={{ className: 'border-none' }}
							thProps={{ className: '!border-b-0 rounded-b-2xl' }}
							trProps={{ className: 'even:!bg-white border-b border-cancle last:border-b-0' }}
							loading={_userRelativeList === 'loading'}
							headers={[{ children: '', props: { 'data-grow': 0.25 } }, 'نام و نام خانوادگی', 'کد ملی', 'جنسیت', 'نسبت']}
							list={$userRelativeList}
							listItemRender={(item: (typeof $userRelativeList)[0], i) => [
								{
									children: (
										<PrimaryCheckbox
											boxProps={{ className: 'mx-auto' }}
											value={selectedItems.find((value) => value?.id === item?.id) ? true : false}
											onChange={() => toggleMarkItem(item)}
										/>
									),
									props: { 'data-grow': 0.25 },
								},
								`${item?.relativeFirstName} ${item?.relativeLastName}` || '-',
								item?.relativeNationalCode || '-',
								(item?.genderKey === 'Male' && 'مرد') || (item?.genderKey === 'Female' && 'زن') || '-',
								item?.relativeTitle || '-',
							]}
						/>
					</div>
					<div className='p-6 flex justify-between items-center gap-2 border-t border-cancle'>
						{/* <div className='flex items-center gap-2 text-primary-1 p-2 cursor-pointer' role='button'>
							<SVGIcon width='w-4' textColor='text-primary-1' icon='plus' />
							<span className='text-xs font-semibold' onClick={renderAddRelative}>
              افزودن بیمه شده جدید
							</span>
              </div> */}

						<PrimaryButton
							content='ثبت'
							onClick={() => {
								changeFetchItemsScope({ $fetchItems: selectedItems });
								closeHandler();
							}}
							boxProps={{ className: 'w-40' }}
						/>
					</div>
				</div>
			)}
		></PrimaryModal>
	);
};
