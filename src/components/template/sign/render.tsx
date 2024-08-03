import { Block } from '@attom';
// import { template_dashboard } from '@context';

type RenderProps = {
	children?: any;
	//
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Render: React.FC<RenderProps> = ({
	children,
	//
	boxProps,
}) => {
	// const { state } = template_dashboard.useContext();
	// // const { collapseSubMenu } = state;

	return (
		<Block boxProps={{ className: `relative mx-auto shadow max-w-screen-md min-h-screen ${boxProps?.className || ''}` }}>
			{children}
		</Block>
	);
};

export default Render;
