// @ts-nocheck

import { PrimaryModal } from '@attom';

export type ComponentProps = {
	children?: any;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	children,
	// box Control
	boxProps,
}) => {
	return (
		<PrimaryModal boxProps={boxProps} onClose={() => null}>
			<div>{children}</div>
		</PrimaryModal>
	);
};
