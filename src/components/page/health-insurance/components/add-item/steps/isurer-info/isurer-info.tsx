import { page_healthInsurance } from '@context';

import { FamilyType, GroupType } from './components';

export const IsurerInfo = () => {
	const { state } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { insurancePolicyInfo } = form;
	const { offerType } = insurancePolicyInfo;

	return (
		<div className='flex flex-col gap-6'>
			<h2 className='text-[#000] text-[21px] font-bold'>اطلاعات بیمه گزار</h2>

			{offerType === 'Family' && <FamilyType />}
			{offerType === 'Group' && <GroupType />}
		</div>
	);
};
