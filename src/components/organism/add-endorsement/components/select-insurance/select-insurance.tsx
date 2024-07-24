import { Block, PrimaryButton, PrimaryInput, PrimaryStepper } from '@attom';
import { organism_addEndorsement } from '@context';
import { useFormValidation } from '@hooks';
import { PageModalHeader } from '@molecule';
import { regex } from '@utils';

type SelectInsuranceProps = {
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	onClose?: () => any;
};

export const SelectInsurance: React.FC<SelectInsuranceProps> = ({
	// ui
	boxProps,

	onClose,
}) => {
	const { state, overWrite } = organism_addEndorsement.useContext();
	const { selectInsurance, selectedInsurance } = state;
	const { $insurance, _insurance, form } = selectInsurance;
	const { insuranceCode } = form;

	const actions = organism_addEndorsement.useActions();

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });
	const changeSectionScope = (values: Partial<typeof selectInsurance> = {}) =>
		overWrite({ scope: 'selectInsurance', value: { ...values } });
	const changeSelectedInsuranceScope = (values: Partial<typeof selectedInsurance> = {}) =>
		overWrite({ scope: 'selectedInsurance', value: { ...values } });
	const changeFormScope = (values: Partial<typeof form> = {}) =>
		overWrite({ scope: 'selectInsurance.form', value: { ...values } });

	const getInsurance = () => actions.getInsurance();

	const mainValidation = {
		insuranceCode: { isValid: regex.name.test(insuranceCode), label: 'کد بیمه نامه', invalidMessage: 'معتبر نمی باشد' },
	};

	const { isValidForm, validationFields } = useFormValidation(mainValidation);

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} px-[24px]` }}>
			<PageModalHeader space='mt-[28px]' title='ثبت الحاقیه' />

			<div className='min-h-[80vh] mt-[28px] p-[28px] flex flex-col border border-cancel-20 rounded-[16px] border-t border-cancel-20'>
				<PrimaryStepper options={['اطلاعات بیمه نامه', 'ثبت الحاقیه']} value='اطلاعات بیمه نامه' />

				<div className='text-[20px] font-[700] mt-[28px]'>انتخاب بیمه نامه</div>

				<div className='mt-[28px] flex items-center flex-wrap gap-[20px]'>
					<PrimaryInput
						boxProps={{ className: 'min-w-[30%]' }}
						label={mainValidation.insuranceCode.label}
						placeholder={`${mainValidation.insuranceCode.label}`}
						value={insuranceCode}
						onChange={(value) => changeFormScope({ insuranceCode: value ?? '' })}
						{...validationFields({
							value: insuranceCode,
							isValid: mainValidation.insuranceCode.isValid,
							invalidMessage: mainValidation.insuranceCode.invalidMessage,
						})}
					/>
					<PrimaryButton
						boxProps={{ className: 'min-w-[150px]' }}
						content='جستجو'
						bgColor='bg-primary-2'
						onClick={getInsurance}
						disabled={!isValidForm}
						loading={_insurance === 'loading'}
						labelSpace
					/>
				</div>

				{$insurance && (
					<div className='grid grid-cols-12 gap-[28px] mt-[28px] pt-[28px] border-t border-cancel-20'>
						<div className='col-span-12 text-[20px] font-[700]'>اطلاعات بیمه نامه</div>

						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='کد رایانه بیمه نامه'
							value={$insurance?._id || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='شماره بیمه نامه'
							value={$insurance?.insuranceNum || ''}
							disabled
						/>
					</div>
				)}

				{/*  */}
				<div className='mt-auto flex items-center justify-between gap-[24px] pt-[24px]'>
					<PrimaryButton boxProps={{ className: 'min-w-[150px]' }} content='انصراف' color='cancel-outline' onClick={onClose} />
					<PrimaryButton
						boxProps={{ className: 'min-w-[150px]' }}
						content='ادامه'
						bgColor='bg-primary-2'
						onClick={() => changeSelectedInsuranceScope({ $insurance: $insurance })}
						disabled={!$insurance || _insurance === 'loading'}
					/>
				</div>
			</div>
		</Block>
	);
};

export default SelectInsurance;
