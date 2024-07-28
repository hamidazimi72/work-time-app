import { Block } from '@attom';
import { template_dashboard } from '@context';
import { Header } from './components';

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
	const { state } = template_dashboard.useContext();
	// const { collapseSubMenu } = state;

	return (
		<Block boxProps={{ className: `relative mx-auto shadow max-w-screen-md ${boxProps?.className || ''}` }}>
			<Header />
			<div className='p-4 pt-20 min-h-screen'>{children}</div>
		</Block>
	);
};

export default Render;
