import { page_healthInsurance } from '@context';

import { Maximize, Minimize } from './components';
import { AddEndorsement } from '@organism';
import { PrimaryModal } from '@attom';
import { useDidMount } from '@hooks';

export type GetItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const GetItem: React.FC<GetItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { getItem, _agencyList, _branchList, _marketerList, _designList } = state;
	const { maximize, showAddEndorsement } = getItem;

	const changeSectionScope = (values: Partial<typeof getItem> = {}) => overWrite({ scope: 'getItem', value: { ...values } });

	const actions = page_healthInsurance.useActions();

	useDidMount(() => {
		if (_agencyList !== 'ok') actions.getUnitListByType({ unitType: 'agency' });
		if (_branchList !== 'ok') actions.getUnitListByType({ unitType: 'branch' });
		if (_marketerList !== 'ok') actions.getUnitListByType({ unitType: 'marketer' });
		if (_designList !== 'ok') actions.getDesignList();
	});

	return (
		<>
			{!maximize && <Minimize />}
			{maximize && <Maximize />}

			{showAddEndorsement && (
				<PrimaryModal
					boxSize='min-w-[90vh] max-h-[95vh]'
					onClose={() => changeSectionScope({ showAddEndorsement: false })}
					render={(close) => (
						<AddEndorsement
							boxProps={{ className: 'pb-[28px]' }}
							insuranceData={getItem.selectedItem as any}
							onClose={close}
							onConfirm={close}
						/>
					)}
				/>
			)}
		</>
	);
};
