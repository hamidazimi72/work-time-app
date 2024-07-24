import { PrimaryModal } from '@attom';

export const Component = ({
	children,
	//
	boxProps,
}) => {
	return (
		<PrimaryModal boxProps={boxProps} onClose={() => null}>
			<div>{children}</div>
		</PrimaryModal>
	);
};
