import { PrimaryCard } from '@attom';
import { organism_addEndorsement } from '@context';
import { useDidMount } from '@hooks';

import { SelectInsurance, SelectedInsurance } from './components';

export type AddEndorsementProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	onClose?: () => any;
	onConfirm?: () => any;

	insuranceData?: API_insurance_list_item | null;
};

const Provided: React.FC<AddEndorsementProps> = ({
	//
	boxProps,

	onClose,
	onConfirm,

	insuranceData,
}) => {
	const { state, overWrite } = organism_addEndorsement.useContext();
	const { selectedInsurance } = state;
	const { $insurance } = selectedInsurance;

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });
	const changeSelectedInsuranceScope = (values: Partial<typeof selectedInsurance> = {}) =>
		overWrite({ scope: 'selectedInsurance', value: { ...values } });

	const onCloseHandler = () => {
		if (onClose) onClose();
	};

	const onConfirmHandler = () => {
		if (onConfirm) onConfirm();
	};

	useDidMount(() => {
		changeSelectedInsuranceScope({ $insurance: insuranceData || null });
	}, [insuranceData]);

	return (
		<PrimaryCard boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			{$insurance === null && <SelectInsurance onClose={onCloseHandler} />}
			{$insurance && <SelectedInsurance onClose={onCloseHandler} onConfirm={onConfirmHandler} />}
		</PrimaryCard>
	);
};

export const AddEndorsement: React.FC<AddEndorsementProps> = (props) => (
	<organism_addEndorsement.Provider>
		<Provided {...props} />
	</organism_addEndorsement.Provider>
);
