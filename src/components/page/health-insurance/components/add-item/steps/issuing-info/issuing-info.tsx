import { PrimaryButton, PrimarySelect, PureForm } from '@attom';
import { page_healthInsurance } from '@context';
import { useDidMount, useFormValidation } from '@hooks';

type IssuingInfoProps = {
	onClose?: () => any;
};

export const IssuingInfo: React.FC<IssuingInfoProps> = ({ onClose }) => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem, $agencyList, _agencyList, $branchList, _branchList, $marketerList, _marketerList } = state;
	const { _addItem, form } = addItem;
	const { issuingInfo } = form;
	const { sodurUnit, moarefUnit, marketer } = issuingInfo;

	const actions = page_healthInsurance.useActions();

	const validation = {
		sodurUnit: { isValid: sodurUnit?._id, invalidMessage: 'نام معتبر نمی باشد' },
		moarefUnit: { isValid: moarefUnit?._id, invalidMessage: 'نام معتبر نمی باشد' },
	};

	const { isValidForm } = useFormValidation(validation);

	const prevStepHandler = () => {
		if (onClose) return onClose();
		else overWrite({ scope: 'addItem', value: { show: false } });
	};

	const nextStepHandler = () => {
		actions.addItem_issuingInfo();
		// overWrite({ scope: 'addItem.form', value: { step: 'insurancePolicyInfo' } });
	};

	useDidMount(() => {
		if (_agencyList !== 'ok') actions.getUnitListByType({ unitType: 'agency' });
		if (_branchList !== 'ok') actions.getUnitListByType({ unitType: 'branch' });
		if (_marketerList !== 'ok') actions.getUnitListByType({ unitType: 'marketer' });
	});

	return (
		<div className='flex flex-col gap-6'>
			<h2 className='text-[#000] text-[21px] font-bold'>اطلاعات صدور</h2>
			<PureForm boxProps={{ className: 'grid grid-cols-12 gap-6' }}>
				<PrimarySelect
					boxProps={{ className: 'col-span-12 lg:col-span-4' }}
					label='واحد صدور'
					placeholder='واحد صدور را انتخاب کنید'
					disabled={_branchList === 'loading'}
					item={sodurUnit}
					onChange={(item) => overWrite({ scope: 'addItem.form.issuingInfo', value: { sodurUnit: item } })}
					prefixIcon='search'
					options={$branchList}
					nameProperty='faName'
					valueProperty='_id'
					required
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-12 lg:col-span-4' }}
					label='واحد معرف'
					placeholder='واحد معرف را انتخاب کنید'
					disabled={_agencyList === 'loading'}
					item={moarefUnit}
					onChange={(item) => overWrite({ scope: 'addItem.form.issuingInfo', value: { moarefUnit: item } })}
					prefixIcon='search'
					options={$agencyList}
					nameProperty='faName'
					valueProperty='_id'
					required
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-12 lg:col-span-4' }}
					label='بازاریاب'
					placeholder='بازاریاب را انتخاب کنید'
					disabled={_marketerList === 'loading'}
					item={marketer}
					onChange={(item) => overWrite({ scope: 'addItem.form.issuingInfo', value: { marketer: item } })}
					prefixIcon='search'
					options={$marketerList}
					nameProperty='faName'
					valueProperty='_id'
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
