import { Block } from '@attom';

export type ComponentProps = {
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	// ui
	boxProps,
}) => {
	return <Block boxProps={boxProps}>Component</Block>;
};
export default Component;
