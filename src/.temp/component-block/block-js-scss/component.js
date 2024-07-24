import { Block } from '@attom';

import CS from './component.module.scss';

export const Component = ({
	// box Control
	boxProps,
}) => {
	return <Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container}` }}>Component</Block>;
};

export default Component;
