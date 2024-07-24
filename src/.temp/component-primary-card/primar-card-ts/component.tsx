// @ts-nocheck

import { PrimaryCard } from '@attom';

export type ComponentProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	// box Control
	boxProps,
}) => {
	return <PrimaryCard boxProps={boxProps}>Component</PrimaryCard>;
};

export default Component;
