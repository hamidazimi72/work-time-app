import { page_healthInsurance } from '@context';
import { Insurance } from '@models';

import { AdvancedFilterModal, AdvanceFilterItem } from '@organism';
import { useState } from 'react';

export type AdvancedFilterProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { fetchItems } = state;
	const { _fetchItems, advancedFilter } = fetchItems;

	const actions = page_healthInsurance.useActions();

	const changeSectionScope = (values: Partial<typeof fetchItems> = {}) =>
		overWrite({ scope: 'fetchItems', value: { ...values } });
	const changeScopeScope = (values: Partial<typeof advancedFilter> = {}) =>
		overWrite({ scope: 'fetchItems.advancedFilter', value: { ...values } });

	const [draftFilters, setDraftFilters] = useState(() => advancedFilter);
	const { selectedFilters, type, insuranceCode, insurer, sodurUnit } = draftFilters;

	const changeDraftFilters = (values: Partial<typeof draftFilters>) => setDraftFilters((PS) => ({ ...PS, ...values }));

	const onClose = () => {
		changeScopeScope({ show: false });
	};

	const onApply = () => {
		changeScopeScope({ ...draftFilters, show: false });
		actions.fetchItems({ advancedFilter: draftFilters });
	};

	const onChangeSelectedFilters = (filters: string[]) => {
		changeDraftFilters({ selectedFilters: filters });
	};

	const filters: AdvanceFilterItem[] = [
		{
			key: 'type',
			type: 'select',
			displayName: 'نوع بیمه نامه',
			displayValue: Insurance.type[type] || type || '',
			isValid: true,
			selectProps: {
				placeholder: 'نوع بیمه نامه را وارد کنید',
				options: Insurance.typeList,
				value: type,
				onChange: (item) => changeDraftFilters({ type: item?.value || '' }),
				emptyOption: true,
			},
		},
		{
			key: 'insuranceCode',
			type: 'input',
			displayName: 'کد بیمه نامه',
			displayValue: insuranceCode,
			isValid: true,
			inputProps: {
				placeholder: 'کد بیمه نامه را وارد کنید',
				value: insuranceCode,
				onChange: (value) => changeDraftFilters({ insuranceCode: value }),
			},
		},
		{
			key: 'insurer',
			type: 'input',
			displayName: 'بیمه گزار',
			displayValue: insurer,
			isValid: true,
			inputProps: {
				placeholder: 'بیمه گزار را وارد کنید',
				value: insurer,
				onChange: (value) => changeDraftFilters({ insurer: value }),
			},
		},
		{
			key: 'sodurUnit',
			type: 'input',
			displayName: 'واحد صدور',
			displayValue: sodurUnit,
			isValid: true,
			inputProps: {
				placeholder: 'واحد صدور را وارد کنید',
				value: sodurUnit,
				onChange: (value) => changeDraftFilters({ sodurUnit: value }),
			},
		},
	];

	return (
		<AdvancedFilterModal
			onClose={onClose}
			onApply={onApply}
			onChangeSelectedFilters={onChangeSelectedFilters}
			loading={_fetchItems === 'loading'}
			selectedFilters={selectedFilters}
			filtersConfig={filters}
		/>
	);
};
