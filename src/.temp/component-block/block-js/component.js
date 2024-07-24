import { Block } from '@attom';

export const Component = ({
	// box Control
	boxProps,
}) => {
	return <Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>Component</Block>;
};

export default Component;
