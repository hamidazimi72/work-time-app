import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PrimaryRadioButton, PrimarySelect, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useDidMount, useFormValidation } from '@hooks';
import { Insurance } from '@models';
import { regex } from '@utils';

export const InsurancePolicyInfo = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const {
		addItem,
		_recompenseServiceProviderList,
		$recompenseServiceProviderList,
		$designList,
		_designList,
		_basicInsuranceList,
		$basicInsuranceList,
	} = state;
	const { _addItem, form } = addItem;
	const { insurancePolicyInfo } = form;
	const {
		canIssueIntroduction,
		canIssueIntroductionOnline,
		contract,
		offer,
		endDate,
		expRecompenseAfter,
		expRecompenseIn,
		hospitalZinaf,
		lastInsuranceCompany,
		paraZinaf,
		paymentType,
		paymentMode,
		recompenseServiceProvider,
		startDate,
		offerType,
	} = insurancePolicyInfo;

	const actions = page_healthInsurance.useActions();

	const mainValidation = {
		offerType: { isValid: offerType === 'Family' || offerType === 'Group' },
		startDate: { isValid: regex.date.test(startDate), invalidMessage: 'تاریخ معتبر نمی باشد' },
		endDate: { isValid: regex.date.test(endDate), invalidMessage: 'تاریخ معتبر نمی باشد' },
		offer: { isValid: offer?._id },
		contract: { isValid: Number(contract), invalidMessage: 'شماره قرارداد معتبر نمی باشد' },
		lastInsuranceCompany: { isValid: lastInsuranceCompany?._id },
		recompenseServiceProvider: { isValid: recompenseServiceProvider?._id },
		canIssueIntroduction: { isValid: canIssueIntroduction },
		canIssueIntroductionOnline: { isValid: canIssueIntroductionOnline },
	};

	const { isValidForm } = useFormValidation(mainValidation);

	const getDesignList = () => actions.getDesignList();
	const getBasicInsuranceList = () => actions.getBasicInsuranceList();
	const getRecompenseServiceProviderItems = () => actions.getRecompenseServiceProviderList();

	useDidMount(() => {
		if (_designList !== 'ok') getDesignList();
		if (_basicInsuranceList !== 'ok') getBasicInsuranceList();
		if (_recompenseServiceProviderList !== 'ok') getRecompenseServiceProviderItems();
	});

	const yesOrNoItems = [
		{ name: 'بله', value: 'true' },
		{ name: 'خیر', value: 'false' },
	];

	const changeFormScope = (values: Partial<typeof form.insurancePolicyInfo> = {}) =>
		overWrite({ scope: 'addItem.form.insurancePolicyInfo', value: { ...values } });

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'issuingInfo' } });
	};

	const nextStepHandler = () => {
		actions.addItem_insurancePolicyInfo();
		// overWrite({ scope: 'addItem.form', value: { step: 'insurerInfo' } });
	};

	useDidMount(() => {
		if (offerType === 'Family') changeFormScope({ paymentMode: 'Yearly' });
		if (offerType === 'Group') changeFormScope({ paymentMode: 'Monthly' });
	}, [offerType]);

	return (
		<div className='flex flex-col gap-x-6 gap-y-8'>
			<h2 className='text-[#000] text-[21px] font-bold'>اطلاعات صدور</h2>
			<PureForm boxProps={{ className: 'grid grid-cols-3 gap-6' }}>
				<PrimaryRadioButton
					boxProps={{ className: 'col-span-1' }}
					title='نوع بیمه نامه'
					value={offerType}
					options={Insurance.typeList}
					onChange={(item) => overWrite({ scope: 'addItem.form.insurancePolicyInfo', value: { offerType: item?.value } })}
					required
				/>
				<PrimaryDatepicker
					boxProps={{ className: 'col-span-1' }}
					label='تاریخ شروع'
					value={startDate}
					onChange={(e) =>
						changeFormScope({
							startDate: e,
							endDate: new Date(new Date(e).getTime() + 1000 * 60 * 60 * 24 * 365).toString(),
						})
					}
				/>
				<PrimaryDatepicker
					boxProps={{ className: 'col-span-1' }}
					label='تاریخ پایان'
					value={endDate}
					onChange={(e) =>
						changeFormScope({
							endDate: e,
							startDate: new Date(new Date(e).getTime() - 1000 * 60 * 60 * 24 * 365).toString(),
						})
					}
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-1' }}
					label='طرح'
					placeholder='طرح را انتخاب کنید'
					disabled={_designList === 'loading'}
					item={offer}
					prefixIcon='search'
					options={$designList}
					onChange={(item) => changeFormScope({ offer: item })}
					valueProperty='_id'
					required
				/>
				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='شماره قرارداد'
					value={contract}
					onChange={(value) => changeFormScope({ contract: value })}
					numeric
					required
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-1' }}
					label='نحوه پرداخت'
					value={paymentMode}
					options={Insurance?.paymentModeList}
					disabled
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-1' }}
					label='نوع پرداخت'
					value={paymentType}
					options={Insurance?.paymentTypeList}
					disabled
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-1' }}
					label='شرکت بیمه گر قبلی'
					placeholder='شرکت بیمه گر قبلی را انتخاب کنید'
					item={lastInsuranceCompany}
					onChange={(value) => changeFormScope({ lastInsuranceCompany: value })}
					nameProperty='faName'
					valueProperty='_id'
					options={$basicInsuranceList}
					prefixIcon='search'
					required
				/>
				{/* {lastInsuranceCompany && (
					<PrimaryInput boxProps={{ className: 'col-span-1' }} label='کد رایانه بیمه گر قبلی' value={'35413536151'} />
				)} */}
				{lastInsuranceCompany ? <span className='col-span-1' /> : <span className='col-span-1' />}
				<PrimarySelect
					boxProps={{ className: 'col-span-1' }}
					label='ارائه کننده خدمات خسارت'
					placeholder='ارائه کننده خدمات خسارت را انتخاب کنید'
					disabled={_recompenseServiceProviderList === 'loading'}
					item={recompenseServiceProvider}
					onChange={(value) => changeFormScope({ recompenseServiceProvider: value })}
					options={$recompenseServiceProviderList}
					nameProperty='faName'
					valueProperty='_id'
					required
				/>
				<PrimaryInput boxProps={{ className: 'col-span-1' }} label='ذینفع بیمارستانی' value={hospitalZinaf} required readOnly />
				<PrimaryInput boxProps={{ className: 'col-span-1' }} label='ذینفع پارا' value={paraZinaf} required readOnly />
				<PrimaryRadioButton
					boxProps={{ className: 'col-span-1' }}
					title='امکان صدور معرفی نامه'
					value={canIssueIntroduction}
					options={yesOrNoItems}
					onChange={(item) =>
						overWrite({ scope: 'addItem.form.insurancePolicyInfo', value: { canIssueIntroduction: item?.value } })
					}
					required
				/>
				<PrimaryRadioButton
					boxProps={{ className: 'col-span-1' }}
					title='مکان صدور معرفی نامه آنلاین'
					value={canIssueIntroductionOnline}
					options={yesOrNoItems}
					onChange={(item) =>
						overWrite({ scope: 'addItem.form.insurancePolicyInfo', value: { canIssueIntroductionOnline: item?.value } })
					}
					required
				/>
				<span className='col-span-1' />

				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='حداکثر مهلت رسیدگی خسارت پس از اتمام بیمه نامه'
					placeholder='حداکثر مهلت را وارد کنید '
					value={expRecompenseAfter}
					onChange={(value) => changeFormScope({ expRecompenseAfter: value })}
				/>
				<PrimaryInput
					boxProps={{ className: 'col-span-1' }}
					label='حداکثر مهلت رسیدگی خسارت در طول بیمه نامه'
					placeholder='حداکثر مهلت را وارد کنید '
					value={expRecompenseIn}
					onChange={(value) => changeFormScope({ expRecompenseIn: value })}
				/>

				<div className='col-span-3 flex justify-between gap-4 mt-20'>
					<PrimaryButton
						content='انصراف'
						disabled={_addItem === 'loading'}
						onClick={prevStepHandler}
						boxProps={{ className: 'w-40' }}
						elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
						textColor='text-cancel'
					/>
					<PrimaryButton
						content='ادامه'
						disabled={_addItem === 'loading' || !isValidForm}
						onClick={nextStepHandler}
						boxProps={{ className: 'w-40' }}
					/>
				</div>
			</PureForm>
		</div>
	);
};
