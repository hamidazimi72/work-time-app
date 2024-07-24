import { Block } from '@attom';
import { page_healthInsurance } from '@context';

import { FetchItems, AddItem, EditItem, GetItem, PaymentItem } from './components';

export type HealthInsuranceProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const HealthInsurance: React.FC<HealthInsuranceProps> = ({
	//
	boxProps,
}) => {
	const { state } = page_healthInsurance.useContext();
	const { addItem, editItem, getItem, paymentItem } = state;

	// Render Route & Components:
	const addItem_render = addItem.show || addItem.selectedItem || null;
	const editItem_render = editItem.selectedItem || null;
	const getItem_render = getItem.selectedItem || null;
	const paymentItem_render = paymentItem.selectedItem || null;
	const fetchItems_render = !(getItem_render && getItem.maximize) && !addItem_render && !editItem_render && !paymentItem_render;

	return (
		<Block boxProps={boxProps}>
			<FetchItems render={fetchItems_render} />
			{addItem_render && <AddItem />}
			{editItem_render && <EditItem />}
			{getItem_render && <GetItem />}
			{paymentItem_render && <PaymentItem />}
		</Block>
	);
};

export default HealthInsurance;
