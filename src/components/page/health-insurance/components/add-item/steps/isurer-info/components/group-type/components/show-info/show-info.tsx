import { PrimaryButton, PrimaryInput, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';

export const ShowInfo = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isurerInfo } = form;
	const { groupType } = isurerInfo;
	const { _info, $info, isExistingProfile } = groupType;

	const postalCodeInquiryValidation = {
		postalCode: { isValid: $info?.postalCode?.length === 10, invalidMessage: 'کد پستی معتبر نمی باشد' },
	};
	const { isValidForm: isValidPostalCodeInquiryForm } = useFormValidation(postalCodeInquiryValidation);

	const postalCodeInquiryHandler = () => { };

	return (
		<div className='border-t border-[#EAECF0] pt-8 grid grid-cols-3 gap-6 mt-8'>
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='شناسه ملی' value={$info?.nationalID} />
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='نام شرکت' value={$info?.companyName} />
			{isExistingProfile === 'N' && (
				<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='شماره ثبت' value={$info?.registrationNumber} />
			)}
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='تاریخ ثبت' value={$info?.submitDate.replaceAll('-', '/')} />
			<PrimaryInput boxProps={{ className: 'col-span-1' }} disabled label='کد اقتصادی' value={$info?.economicCode} />
			<span className={isExistingProfile === 'Y' ? `col-span-2` : `col-span-1`} />

			{isExistingProfile === 'Y' && (
				<PureForm boxProps={{ className: 'col-span-3 flex grid grid-cols-3 gap-6' }}>
					<div className='col-span-1 flex items-end gap-2'>
						<PrimaryInput
							boxProps={{ className: 'w-full' }}
							label='کد پستی'
							placeholder='کد پستی را وارد کنید'
							value={$info?.postalCode}
							onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.groupType.$info', value: { postalCode: value } })}
							maxLength={10}
							numeric
							disabled
						/>
						<PrimaryButton
							content='استعلام'
							onClick={postalCodeInquiryHandler}
							disabled={_info === 'loading' || !isValidPostalCodeInquiryForm}
						/>
					</div>
					<PrimaryInput boxProps={{ className: 'col-span-2' }} label='آدرس' value={$info?.address || '-'} disabled />
				</PureForm>
			)}
		</div>
	);
};
