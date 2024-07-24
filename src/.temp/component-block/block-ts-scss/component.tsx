import { Block } from '@attom';

import CS from './component.module.scss';

export type ComponentProps = {
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	// ui
	boxProps,
}) => {
	return <Block boxProps={{ ...boxProps, className: `${CS?.container} ${boxProps?.className || ''}` }}>Component</Block>;
};

export default Component;
