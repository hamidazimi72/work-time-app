import { Block } from '@attom';
import { template_main } from '@context';

// import { SideNav } from './components';

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
	const { state } = template_main.useContext();
	const { collapseSubMenu } = state;

	return (
		<Block boxProps={{ className: `${boxProps?.className || ''} text-text-primary bg-background-primary overflow-hidden` }}>
			<div className={`flex app-wrapper`}>
				{/* <SideNav boxProps={{ className: `bg-background-secondary shrink-0 ${collapseSubMenu ? 'w-[20px]' : 'w-[300px]'}` }} /> */}

				<div
					className={`${collapseSubMenu ? 'w-[calc(100vw_-_20px)]' : 'w-[calc(100vw_-_300px)]'} overflow-y-scroll min-h-[100vh] pb-2 scrollbar-hidden`}
				>
					{children}
				</div>
			</div>
		</Block>
	);
};

export default Render;
