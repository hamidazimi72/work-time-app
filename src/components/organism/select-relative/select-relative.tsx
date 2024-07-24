import { PrimaryCard } from '@attom';
import { organism_selectRelative } from '@context';
import { useDidMount } from '@hooks';

import { FetchItems, MarkItem } from './components';

export type SelectRelativeProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	insuranceData?: API_insurance_list_item | null;
};

const Provided: React.FC<SelectRelativeProps> = ({
	//
	boxProps,
	insuranceData,
}) => {
	const { state, overWrite } = organism_selectRelative.useContext();
	const { fetchItems, markItem, unmarkItem } = state;

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });

	useDidMount(() => {
		changeStateScope({ $insurance: insuranceData || null });
	}, [insuranceData]);

	// Render Route & Components:
	const markItem_render = markItem.show || null;
	const unmarkItem_render = unmarkItem.selectedItem || null;

	const fetchItems_render = true;

	return (
		<PrimaryCard boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			{fetchItems_render && <FetchItems />}
			{markItem_render && <MarkItem />}
		</PrimaryCard>
	);
};

export const SelectRelative: React.FC<SelectRelativeProps> = (props) => (
	<organism_selectRelative.Provider>
		<Provided {...props} />
	</organism_selectRelative.Provider>
);
