import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useFormValidation } from '@hooks';
import { regex } from '@utils';

import { RegisterForm, ShowInfo } from './components';

export const GroupType = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isurerInfo } = form;
	const { groupType, _isurerInfo } = isurerInfo;
	const { _info, isExistingProfile, isRegisterCompany, nationalId } = groupType;

	const actions = page_healthInsurance?.useActions()

	const nationalIdInquiryValidation = {
		nationalCode: { isValid: nationalId, invalidMessage: 'شناسه ملی معتبر نمی باشد' },
	};
	const { isValidForm: isValidNationalIdInquiryForm } = useFormValidation(nationalIdInquiryValidation);

	const nationalIdInquiryHandler = () => {
		actions.nationalIdInquiry_isurerInfo_groupType();
	};

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'insurancePolicyInfo' } });
	};

	const nextStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: '' } });
	};

	return (
		<div>
			<div className='grid grid-cols-3 gap-6'>
				<PureForm boxProps={{ className: 'col-span-1 flex items-end gap-2' }}>
					<PrimaryInput
						boxProps={{ className: 'w-full' }}
						label='شناسه ملی'
						placeholder='شناسه ملی را وارد کنید'
						value={nationalId}
						onChange={(value) => overWrite({ scope: 'addItem.form.isurerInfo.groupType', value: { nationalId: value } })}
						numeric
					/>
					<PrimaryButton
						content='جستجو'
						onClick={nationalIdInquiryHandler}
						disabled={_info === 'loading' || !isValidNationalIdInquiryForm}
					/>
				</PureForm>
			</div>

			{isExistingProfile === 'Y' && <ShowInfo />}

			{isExistingProfile === 'N' && !isRegisterCompany && <RegisterForm />}

			{isExistingProfile === 'N' && isRegisterCompany && <ShowInfo />}

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
					disabled={_isurerInfo === 'loading'}
					onClick={nextStepHandler}
					boxProps={{ className: 'w-40' }}
				/>
			</div>
		</div>
	);
};
