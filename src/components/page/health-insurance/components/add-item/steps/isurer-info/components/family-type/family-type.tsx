import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';
import { regex } from '@utils';

import { ShowInfo } from './components';

export const FamilyType = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isurerInfo } = form;
	const { familyType, _isurerInfo } = isurerInfo;
	const {
		nationalCode,
		_info,
		$info,
		isExistingProfile,
		birthDate,
		phoneNumber,
		otp,
		isSendOtp,
		isCheckOtp,
		_sendOtp,
		_checkOtp,
	} = familyType;

	const actions = page_healthInsurance.useActions();

	const nationalCodeInquiryValidation = {
		nationalCode: { isValid: nationalCode.length === 10, invalidMessage: 'کد ملی معتبر نمی باشد' },
	};
	const { isValidForm: isValidNationalCodeInquiryForm } = useFormValidation(nationalCodeInquiryValidation);

	// const postalCodeInquiryValidation = {
	// 	postalCode: { isValid: $info?.postalCode.length === 10, invalidMessage: 'کد پستی معتبر نمی باشد' },
	// };
	// const { isValidForm: isValidPostalCodeInquiryForm } = useFormValidation(postalCodeInquiryValidation);

	const sendOtpValidation = {
		birthDate: { isValid: regex.date.test(birthDate), invalidMessage: 'تاریخ تولد معتبر نمی باشد' },
		phoneNumber: { isValid: regex.cellphone.test(phoneNumber), invalidMessage: 'تاریخ تولد معتبر نمی باشد' },
	};
	const { isValidForm: isValidSendOtpForm } = useFormValidation(sendOtpValidation);

	const nationalCodeInquiryHandler = () => {
		actions.nationalCodeInquiry_isurerInfo_familyType();
	};

	const sendOtpHandler = () => {
		actions.signupUser_isurerInfo_familyType();
	};

	const checkOtpHandler = () => {
		actions.signupVerifyUser_isurerInfo_familyType();
	};

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'insurancePolicyInfo' } });
	};

	const nextStepHandler = () => {
		actions.addItem_isurerInfo_familyType();
		// overWrite({ scope: 'addItem.form', value: { step: 'insuredListInfo' } });
	};

	return (
		<div>
			<div className='grid grid-cols-3 gap-6'>
				<PureForm boxProps={{ className: 'col-span-1 flex items-end gap-2' }}>
					<PrimaryInput
						boxProps={{ className: 'w-full' }}
						label='کد ملی'
						placeholder='کد ملی را وارد کنید'
						value={nationalCode}
						onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType', value: { nationalCode: value } })}
						maxLength={10}
						numeric
					/>
					<PrimaryButton
						content='جستجو'
						onClick={nationalCodeInquiryHandler}
						disabled={_info === 'loading' || !isValidNationalCodeInquiryForm}
					/>
				</PureForm>
			</div>

			{isExistingProfile === 'Y' && <ShowInfo />}

			{isExistingProfile === 'N' && (
				<div className='p-6 rounded-2xl border border-cancle bg-[#FCFCFD] mt-8'>
					<PureForm boxProps={{ className: 'flex items-end gap-8' }}>
						<PrimaryDatepicker
							boxProps={{ className: 'flex-1' }}
							label='تاریخ تولد'
							placeholder='تاریخ تولد خود را وارد کنید'
							value={birthDate}
							onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType', value: { birthDate: value } })}
							disabled={isCheckOtp}
						/>
						<PrimaryInput
							boxProps={{ className: 'flex-1' }}
							label='شماره موبایل'
							placeholder='شماره موبایل خود را وارد کنید'
							value={phoneNumber}
							onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType', value: { phoneNumber: value } })}
							maxLength={11}
							disabled={isCheckOtp}
						/>
						{!isCheckOtp && (
							<PrimaryButton
								content='دریافت کد تایید'
								disabled={_sendOtp === 'loading' || !isValidSendOtpForm}
								onClick={sendOtpHandler}
								boxProps={{ className: 'w-32' }}
								bgColor='bg-success'
								rounded='rounded-full'
							/>
						)}
					</PureForm>

					{isSendOtp && phoneNumber.length === 11 && (
						<div className='flex flex-col gap-4 border-t border-cancle mt-8 pt-8'>
							<h3 className='font-semibold text-text-primary'>کد ارسال شده به {phoneNumber} را وارد کنید</h3>
							<div className='grid grid-cols-3'>
								<PureForm boxProps={{ className: 'col-span-1 flex items-end gap-2' }}>
									<PrimaryInput
										boxProps={{ className: 'w-full' }}
										label='کد تایید'
										placeholder='کد تایید را وارد کنید'
										value={otp}
										onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType', value: { otp: value } })}
										maxLength={5}
										numeric
									/>
									<PrimaryButton
										content='تایید'
										onClick={checkOtpHandler}
										disabled={_checkOtp === 'loading' || otp.length !== 5}
									/>
								</PureForm>
							</div>
						</div>
					)}
				</div>
			)}

			{/* {isCheckOtp && <ShowInfo />} */}

			<div className='col-span-3 flex justify-between gap-4 mt-10'>
				<PrimaryButton
					content='بازگشت'
					disabled={_isurerInfo === 'loading'}
					onClick={prevStepHandler}
					boxProps={{ className: 'w-40' }}
					elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
					textColor='text-cancel'
				/>
				<PrimaryButton
					content='ذخیره و ادامه'
					disabled={_isurerInfo === 'loading' || !$info?.maritalStatus}
					onClick={nextStepHandler}
					boxProps={{ className: 'w-40' }}
				/>
			</div>
		</div>
	);
};
