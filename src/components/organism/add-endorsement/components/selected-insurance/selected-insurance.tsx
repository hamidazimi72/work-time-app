import { Block, PrimaryButton, PrimaryDatepicker, PrimaryInput, PrimaryRadioButton, PrimarySelect, PrimaryStepper } from '@attom';
import { SelectRelative } from '@components/organism/select-relative/select-relative';
import { organism_addEndorsement, sharedActions } from '@context';
import { useDidMount, useFormValidation } from '@hooks';
import { Endorsement, Insurance } from '@models';
import { PageModalHeader } from '@molecule';
import { regex } from '@utils';

type SelectedInsuranceProps = {
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	onClose?: () => any;
	onConfirm?: () => any;
};

export const SelectedInsurance: React.FC<SelectedInsuranceProps> = ({
	// ui
	boxProps,

	onClose,
	onConfirm,
}) => {
	const { state, overWrite } = organism_addEndorsement.useContext();
	const { selectedInsurance, _basicInsuranceList, $basicInsuranceList } = state;
	const { $insurance, form, _addItem } = selectedInsurance;
	const {
		type,
		applyDate,
		cause,
		description,
		// type general-information
		hospitalBeneficiary,
		paraBeneficiary,
		contractNum,
		lastInsurance,
		lastInsuranceNum,
		lastInsuranceUniqueCode,
		canIssueIntroduction,
		paymentMode,
		// type member-list
		// type member-list-info
	} = form;

	const actions = organism_addEndorsement.useActions();

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });
	const changeSectionScope = (values: Partial<typeof selectedInsurance> = {}) =>
		overWrite({ scope: 'selectedInsurance', value: { ...values } });
	const changeFormScope = (values: Partial<typeof form> = {}) =>
		overWrite({ scope: 'selectedInsurance.form', value: { ...values } });

	const getBasicInsuranceList = () =>
		sharedActions.getBasicInsuranceList({
			statusChangeCB: (_basicInsuranceList) => changeStateScope({ _basicInsuranceList }),
			okCB: ($basicInsuranceList) => changeStateScope({ $basicInsuranceList }),
		});

	useDidMount(() => {
		getBasicInsuranceList();
	});

	useDidMount(() => {
		// changeFormScope({paymentMode: $insurance. ""})
	}, [$insurance]);

	const onConfirmHandler = () => {
		actions.addItem({
			okCB: (data) => {
				if (onConfirm) onConfirm();
			},
		});
	};

	const mainValidation = {
		type: { isValid: Boolean(type), label: 'نوع الحاقیه', invalidMessage: 'معتبر نمی باشد' },
		applyDate: { isValid: regex.date.test(applyDate), label: 'تاریخ اعمال الحاقیه', invalidMessage: 'معتبر نمی باشد' },
		cause: { isValid: Boolean(cause), label: 'علت الحاقیه', invalidMessage: 'معتبر نمی باشد' },
		description: { isValid: regex.name.test(description), label: 'شرح الحاقیه', invalidMessage: 'معتبر نمی باشد' },
		// type general-information
		hospitalBeneficiary: {
			isValid: type === 'general-information' ? regex.name.test(hospitalBeneficiary) : true,
			label: 'ذینفع بیمارستانی',
			invalidMessage: 'معتبر نمی باشد',
		},
		paraBeneficiary: {
			isValid: type === 'general-information' ? regex.name.test(paraBeneficiary) : true,
			label: 'ذینغع پارا',
			invalidMessage: 'معتبر نمی باشد',
		},
		contractNum: {
			isValid: type === 'general-information' ? !contractNum || regex.name.test(contractNum) : true,
			label: 'شماره قرارداد',
			invalidMessage: 'معتبر نمی باشد',
		},
		lastInsurance: {
			isValid: type === 'general-information' ? true : true,
			label: 'شرکت بیمه گر قبلی',
			invalidMessage: 'معتبر نمی باشد',
		},
		lastInsuranceNum: {
			isValid: type === 'general-information' && lastInsurance ? regex.name.test(lastInsuranceNum) : true,
			label: 'شماره بیمه نامه سال قبل',
			invalidMessage: 'معتبر نمی باشد',
		},
		lastInsuranceUniqueCode: {
			isValid: type === 'general-information' && lastInsurance ? regex.name.test(lastInsuranceUniqueCode) : true,
			label: 'کد بیمه نامه سال قبل',
			invalidMessage: 'معتبر نمی باشد',
		},
		canIssueIntroduction: {
			isValid: type === 'general-information' ? true : true,
			label: 'امکان صدور معرفی نامه',
			invalidMessage: 'معتبر نمی باشد',
		},
		paymentMode: {
			isValid: type === 'general-information' ? Boolean(paymentMode) : true,
			label: 'نحوه پرداخت',
			invalidMessage: 'معتبر نمی باشد',
		},
		// type member-list
		memberList: {
			isValid: type === 'member-list' || type === 'member-list-info' ? false : true,
			label: 'لیست بیمه شدگان',
			invalidMessage: 'معتبر نمی باشد',
		},
	};

	const { isValidForm, validationFields } = useFormValidation(mainValidation);

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} px-[24px]` }}>
			<PageModalHeader space='mt-[28px]' title='ثبت الحاقیه' />

			<div
				className={`min-h-[80vh] mt-[28px] p-[28px] flex flex-col border border-cancel-20 rounded-[16px] border-t border-cancel-20 ${_addItem === 'loading' ? 'pointer-events-none opacity-80' : ''}`}
			>
				<PrimaryStepper options={['اطلاعات بیمه نامه', 'ثبت الحاقیه']} value='ثبت الحاقیه' />

				<div className='text-[20px] font-[700] mt-[28px]'>اطلاعات الحاقیه</div>

				{/* FORM */}
				<div className='grid grid-cols-12 mt-[28px] gap-[28px]'>
					<PrimaryRadioButton
						boxProps={{ className: 'col-span-12' }}
						labelClass='text-[14px]'
						ulProps={{ className: '!min-h-[30px]' }}
						title={mainValidation.type.label}
						options={Endorsement.typeList}
						value={type}
						onChange={(item) => changeFormScope({ type: item?.value ?? '' })}
					/>
				</div>

				<div className='grid grid-cols-12 mt-[28px] gap-[28px]'>
					<PrimaryDatepicker
						boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
						label={mainValidation.applyDate.label}
						placeholder={`${mainValidation.applyDate.label}`}
						value={applyDate}
						onChange={(value) => changeFormScope({ applyDate: value ?? '' })}
						{...validationFields({
							value: applyDate,
							isValid: mainValidation.applyDate.isValid,
							invalidMessage: mainValidation.applyDate.invalidMessage,
							required: true,
						})}
					/>
				</div>

				<div className='grid grid-cols-12 mt-[28px] gap-[28px]'>
					<PrimaryRadioButton
						boxProps={{ className: 'col-span-12' }}
						labelClass='text-[14px]'
						ulProps={{ className: '!min-h-[30px]' }}
						title={mainValidation.cause.label}
						options={Endorsement.causeList}
						value={cause}
						onChange={(item) => changeFormScope({ cause: item?.value ?? '' })}
					/>
					<PrimaryInput
						boxProps={{ className: 'col-span-12' }}
						label={mainValidation.description.label}
						placeholder={`${mainValidation.description.label}`}
						value={description}
						onChange={(value) => changeFormScope({ description: value ?? '' })}
						{...validationFields({
							value: description,
							isValid: mainValidation.description.isValid,
							invalidMessage: mainValidation.description.invalidMessage,
							required: true,
						})}
						textarea
						rows={5}
					/>
				</div>

				{type === 'general-information' && (
					<div className='grid grid-cols-12 mt-[28px] gap-[28px]'>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.hospitalBeneficiary.label}
							placeholder={`${mainValidation.hospitalBeneficiary.label}`}
							value={hospitalBeneficiary}
							onChange={(value) => changeFormScope({ hospitalBeneficiary: value ?? '' })}
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.paraBeneficiary.label}
							placeholder={`${mainValidation.paraBeneficiary.label}`}
							value={paraBeneficiary}
							onChange={(value) => changeFormScope({ paraBeneficiary: value ?? '' })}
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.contractNum.label}
							placeholder={`${mainValidation.contractNum.label}`}
							value={contractNum}
							onChange={(value) => changeFormScope({ contractNum: value ?? '' })}
							numeric
						/>
						<PrimarySelect
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.lastInsurance.label}
							placeholder={`${mainValidation.lastInsurance.label}`}
							options={$basicInsuranceList}
							item={lastInsurance}
							onChange={(item) => changeFormScope({ lastInsurance: item || null })}
							prefixIcon='search'
							disabled={_basicInsuranceList === 'loading'}
							nameProperty='faName'
							valueProperty='_id'
							emptyOption
							dataTable
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.lastInsuranceNum.label}
							placeholder={`${mainValidation.lastInsuranceNum.label}`}
							value={lastInsuranceNum}
							onChange={(value) => changeFormScope({ lastInsuranceNum: value ?? '' })}
							disabled={!lastInsurance}
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label={mainValidation.lastInsuranceUniqueCode.label}
							placeholder={`${mainValidation.lastInsuranceUniqueCode.label}`}
							value={lastInsuranceUniqueCode}
							onChange={(value) => changeFormScope({ lastInsuranceUniqueCode: value ?? '' })}
							disabled={!lastInsurance}
						/>
						<PrimaryRadioButton
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							title={mainValidation.canIssueIntroduction.label}
							options={[
								{ name: 'بله', value: true },
								{ name: 'خیر', value: false },
							]}
							value={canIssueIntroduction}
							onChange={(item) => changeFormScope({ canIssueIntroduction: item?.value })}
						/>

						<PrimaryRadioButton
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							title={mainValidation.paymentMode.label}
							options={Insurance.paymentModeList}
							value={paymentMode}
							onChange={(item) => changeFormScope({ paymentMode: item?.value })}
						/>
					</div>
				)}

				{(type === 'member-list' || type === 'member-list-info') && (
					<SelectRelative boxProps={{ className: 'pt-[24px]' }} insuranceData={$insurance} />
				)}

				{/*  */}
				<div className='mt-auto flex items-center justify-between gap-[24px] pt-[24px]'>
					<PrimaryButton boxProps={{ className: 'min-w-[150px]' }} content='انصراف' color='cancel-outline' onClick={onClose} />
					<PrimaryButton
						boxProps={{ className: 'min-w-[150px]' }}
						content='ثبت'
						bgColor='bg-primary-2'
						onClick={onConfirmHandler}
						disabled={!isValidForm}
						loading={_addItem === 'loading'}
						grayscaleDisabled
					/>
				</div>
			</div>
		</Block>
	);
};

export default SelectedInsurance;
