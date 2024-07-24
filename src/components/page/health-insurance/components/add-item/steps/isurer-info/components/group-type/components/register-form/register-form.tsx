import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';
import { regex } from '@utils';

export const RegisterForm = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isurerInfo } = form;
	const { groupType } = isurerInfo;
	const { registerForm } = groupType;
	const { address, companyName, economicCode, postalCode, registerationDate, _registerForm } = registerForm;

	const actions = page_healthInsurance.useActions();

	const registerValidation = {
		companyName: { isValid: regex.name.test(companyName), invalidMessage: 'نام شرکت معتبر نمی باشد' },
		registerationDate: { isValid: regex.date.test(registerationDate), invalidMessage: 'تاریخ ثبت معتبر نمی باشد' },
		economicCode: { isValid: !isNaN(+economicCode), invalidMessage: 'کد اقتصادی معتبر نمی باشد' },
	};
	const { isValidForm: isValidRegisterForm } = useFormValidation(registerValidation);

	const postalCodeInquiryValidation = {
		postalCode: { isValid: postalCode.length === 10, invalidMessage: 'کد پستی معتبر نمی باشد' },
	};
	const { isValidForm: isValidPostalCodeInquiryForm } = useFormValidation(postalCodeInquiryValidation);

	const postalCodeInquiryHandler = () => { };
	const companyRegisterHandler = () => {
		actions.signupCompany_isurerInfo_groupType();
	};

	return (
		<div className='p-6 rounded-2xl border border-cancle bg-[#FCFCFD] mt-8'>
			<PureForm boxProps={{ className: 'grid grid-cols-3 gap-x-6 gap-y-8' }}>
				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='نام شرکت'
					value={companyName}
					onChange={(value) =>
						overWrite({ scope: 'addItem.form.isurerInfo.groupType.registerForm', value: { companyName: value } })
					}
				/>
				<PrimaryDatepicker
					boxProps={{ className: 'col-span-1' }}
					label='تاریخ ثبت'
					value={registerationDate}
					onChange={(value) =>
						overWrite({ scope: 'addItem.form.isurerInfo.groupType.registerForm', value: { registerationDate: value } })
					}
				/>
				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='کد اقتصادی'
					value={economicCode}
					numeric
					onChange={(value) =>
						overWrite({ scope: 'addItem.form.isurerInfo.groupType.registerForm', value: { economicCode: value } })
					}
				/>
				<div className='col-span-3 flex grid grid-cols-3 gap-6'>
					<div className='col-span-1 flex items-end gap-2'>
						<PrimaryInput
							boxProps={{ className: 'w-full' }}
							label='کد پستی'
							placeholder='کد پستی را وارد کنید'
							value={postalCode}
							onChange={(value) =>
								overWrite({ scope: 'addItem.form.isurerInfo.groupType.registerForm', value: { postalCode: value } })
							}
							maxLength={10}
							numeric
						/>
						<PrimaryButton
							content='استعلام'
							onClick={postalCodeInquiryHandler}
							// disabled={_registerForm === 'loading' || !isValidPostalCodeInquiryForm}
							disabled
						/>
					</div>
					<PrimaryInput boxProps={{ className: 'col-span-2' }} label='آدرس' value={address} />
				</div>
				<div className='col-span-3 flex justify-end'>
					<PrimaryButton
						boxProps={{ className: 'w-40' }}
						content='ثبت'
						onClick={companyRegisterHandler}
						disabled={_registerForm === 'loading' || !isValidRegisterForm}
					/>
				</div>
			</PureForm>
		</div>
	);
};
