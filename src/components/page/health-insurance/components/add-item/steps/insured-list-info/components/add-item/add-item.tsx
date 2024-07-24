import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PrimaryModal, PrimarySelect, PureForm, SVGIcon } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';
import { regex } from '@utils';

export const AddItem = () => {
	const { state, overWrite, initState } = page_healthInsurance.useContext();
	const { form } = state.addItem;
	const { insuredListInfo } = form;
	const { addItem } = insuredListInfo;
	const {
		_addItem,
		_nationalCodeInquiry,
		nationalCode,
		$profile,
		$relationItems,
		_relationItems,
		selectedRelation,
		isExistingProfile,
		registerationForm,
	} = addItem;
	const { _registerationForm, birthDate, phoneNumber } = registerationForm;

	const nationalCodeInquiryFormValidation = {
		postalCode: { isValid: nationalCode.length === 10, invalidMessage: 'کد ملی معتبر نمی باشد' },
	};
	const { isValidForm: isValidNationalCodeInquiryForm } = useFormValidation(nationalCodeInquiryFormValidation);

	const registerFormValidation = {
		birthDate: { isValid: regex.date.test(birthDate), invalidMessage: 'تاریخ تولد معتبر نمی باشد' },
		phoneNumber: { isValid: regex.cellphone.test(phoneNumber), invalidMessage: 'شماره موبایل معتبر نمی باشد' },
	};
	const { isValidForm: isValidregisterForm } = useFormValidation(registerFormValidation);

	const actions = page_healthInsurance.useActions();

	const nationalCodeInquiryHandler = () => {
		actions.nationalCodeInquiry_insuredListInfo()
	};

	const signupProfileHandler = () => {
		actions.signupProfile_insuredListInfo()
	};

	const addNewItemHandler = () => {
		actions.addAssociteItem_insuredListInfo();
	};

	const onClose = () => {
		overWrite({ scope: 'addItem.form.insuredListInfo', value: { addItem: initState.addItem.form.insuredListInfo.addItem } });
	};

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
					<div className='p-6'>
						<div className='flex flex-col gap-6'>
							<h4 className='font-bold'>منسوب جدید</h4>
							<PureForm boxProps={{ className: 'w-1/2 flex items-end gap-2' }}>
								<PrimaryInput
									boxProps={{ className: 'w-full' }}
									label='کد ملی'
									placeholder='کد ملی را وارد کنید'
									value={nationalCode}
									onChange={(value) =>
										overWrite({ scope: 'addItem.form.insuredListInfo.addItem', value: { nationalCode: value } })
									}
									maxLength={10}
									numeric
								/>
								<PrimaryButton
									content='جستجو'
									onClick={nationalCodeInquiryHandler}
									disabled={_nationalCodeInquiry === 'loading' || !isValidNationalCodeInquiryForm}
								/>
							</PureForm>
						</div>

						{isExistingProfile === false && <PureForm boxProps={{ className: 'flex flex-col gap-6 bg-[#FCFCFD] border border-[#EAECF0] rounded-2xl p-6 mt-6' }}>
							<div className='flex gap-6'>
								<PrimaryDatepicker
									boxProps={{ className: 'flex-1' }}
									label='تاریخ تولد'
									placeholder='تاریخ تولد خود را وارد کنید'
									value={birthDate}
									onChange={(value) =>
										overWrite({ scope: 'addItem.form.insuredListInfo.addItem.registerationForm', value: { birthDate: value } })
									}
									isValid={registerFormValidation.birthDate.isValid}
								// validationMessage={registerFormValidation.birthDate.invalidMessage}
								// disabled={!$profile?.name}
								/>
								<PrimaryInput
									boxProps={{ className: 'flex-1' }}
									label='شماره موبایل'
									placeholder='شماره موبایل خود را وارد کنید'
									value={phoneNumber}
									onChange={(value) =>
										overWrite({ scope: 'addItem.form.insuredListInfo.addItem.registerationForm', value: { phoneNumber: value } })
									}
									isValid={registerFormValidation.phoneNumber.isValid}
									// validationMessage={registerFormValidation.phoneNumber.invalidMessage}
									maxLength={11}
								// disabled={!$profile?.name}
								/>
							</div>
							{/* {$profile?.name && ( */}
							<PrimaryButton
								content='استعلام'
								onClick={signupProfileHandler}
								disabled={_registerationForm === 'loading' || !isValidregisterForm}
								boxProps={{ className: 'mr-auto' }}
							/>
							{/* )} */}
						</PureForm>}

						{isExistingProfile &&
							<>
								<hr className='bg-cancle my-8' />
								<div className='flex flex-col mb-16'>
									<div className='bg-[#FCFCFD] rounded-2xl px-6 py-4 grid grid-cols-4 gap-2 text-xs text-cancel font-semibold mb-4'>
										<span className='text-center'>نام و نام خانوادگی</span>
										<span className='text-center'>کد ملی</span>
										<span className='text-center'>جنسیت</span>
										<span className='text-center'>نسبت</span>
									</div>

									<div className='bg-[#F9FAFB] rounded-2xl px-6 py-4 grid grid-cols-4 items-center gap-2 text-text-primary font-medium mb-6'>
										<span className='flex gap-2 items-center justify-center'>
											<span className='w-12 h-12 rounded-full bg-white flex justify-center items-center'>
												<SVGIcon icon='user' width='w-6' textColor='text-[#98A2B3]' />
											</span>
											{`${$profile?.firstName} ${$profile?.lastName}` || '-'}
										</span>
										<span className='text-center'>{$profile?.nationalCode || '-'}</span>
										<span className='text-center'>{$profile?.genderKey === 'Male' && 'مرد' || $profile?.genderKey === 'Female' && 'زن' || '-'}</span>
										<span className='text-center'>{$profile?.relation || '-'}</span>
									</div>

									<PrimarySelect
										boxProps={{ className: 'w-1/2' }}
										label='نسبت فرد با متقاضی'
										placeholder='انتخاب نسبت فرد با متقاضی'
										options={$relationItems}
										nameProperty='title'
										valueProperty='id'
										item={selectedRelation}
										disabled={_relationItems === 'loading'}
										onChange={(item) =>
											overWrite({ scope: 'addItem.form.insuredListInfo.addItem', value: { selectedRelation: item } })
										}
									/>
								</div>
							</>
						}
					</div>
					<div className='p-6 flex justify-between items-center gap-2 border-t border-cancle'>
						<PrimaryButton
							content='انصراف'
							onClick={closeHandler}
							boxProps={{ className: 'w-40' }}
							elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
							textColor='text-cancel'
						/>

						<PrimaryButton
							content='ثبت'
							disabled={_addItem === 'loading' || !selectedRelation}
							onClick={addNewItemHandler}
							// onClick={closeHandler}
							boxProps={{ className: 'w-40' }}
						/>
					</div>
				</>
			)}
		></PrimaryModal>
	);
};
