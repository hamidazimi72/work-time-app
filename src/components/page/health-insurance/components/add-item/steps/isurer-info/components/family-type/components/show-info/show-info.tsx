import { PrimaryButton, PrimaryInput, PrimaryRadioButton, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';

export const ShowInfo = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isurerInfo } = form;
	const { familyType } = isurerInfo;
	const { _info, $info, isExistingProfile, isCheckOtp } = familyType;

	// const postalCodeInquiryValidation = {
	// 	postalCode: { isValid: $info?.postalCode.length === 10, invalidMessage: 'کد پستی معتبر نمی باشد' },
	// };
	// const { isValidForm: isValidPostalCodeInquiryForm } = useFormValidation(postalCodeInquiryValidation);

	const maritalStatusItems = [
		{ name: 'مجرد', value: '0' },
		{ name: 'متاهل', value: '1' },
	];

	const postalCodeInquiryHandler = () => {};

	return (
		<div className='border-t border-[#EAECF0] pt-8 grid grid-cols-3 gap-6 mt-8'>
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='نام' value={$info?.firstName} />
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='نام خانوادگی' value={$info?.lastName} />
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='کد ملی' value={$info?.nationalCode} />
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='سن' value={$info?.age || '-'} />
			<PrimaryInput
				boxProps={{ className: 'col-span-1' }}
				disabled
				label='جنسیت'
				value={($info?.gender === 1 && 'مرد') || ($info?.gender === 2 && 'زن') || '-'}
			/>
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='شماره موبایل' value={$info?.phoneNumber} />
			{isCheckOtp && (
				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='نسبت'
					value={$info?.relation}
					onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType.$info', value: { relation: value } })}
				/>
			)}
			<PrimaryRadioButton
				title='وضعیت تاهل'
				boxProps={{ className: 'col-span-1' }}
				value={$info?.maritalStatus}
				onChange={(item) =>
					overWrite({ scope: 'addItem.form.isurerInfo.familyType.$info', value: { maritalStatus: item?.value } })
				}
				options={maritalStatusItems}
				// readOnly={!isCheckOtp}
			/>
			<span className='col-span-2' />
			<PureForm boxProps={{ className: 'col-span-3 grid grid-cols-3 gap-6' }}>
				<div className='col-span-1 flex items-end gap-2'>
					<PrimaryInput
						boxProps={{ className: 'w-full' }}
						label='کد پستی'
						placeholder='کد پستی را وارد کنید'
						value={$info?.zipCode}
						onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.familyType.$info', value: { zipCode: value } })}
						maxLength={10}
						numeric
						disabled
					/>
					<PrimaryButton content='استعلام' onClick={postalCodeInquiryHandler} disabled={_info === 'loading' || true} />
				</div>
				<PrimaryInput boxProps={{ className: 'col-span-2' }} label='آدرس' value={$info?.address || '-'} disabled />
			</PureForm>
		</div>
	);
};
