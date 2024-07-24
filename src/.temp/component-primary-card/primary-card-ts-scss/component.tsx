// @ts-nocheck

import { PrimaryCard } from '@attom';

import CS from ' ./component.module.scss';

export type ComponentProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	// box Control
	boxProps,
}) => {
	return (
		<PrimaryCard boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container}` }}>Component</PrimaryCard>
	);
};

export default Component;
