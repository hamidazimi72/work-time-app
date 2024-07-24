import { useRoutes } from '@hooks';
import React from 'react';

export type SubRouteListProps = {
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	list?: { name?: string; path?: string; activePath?: RegExp }[];
};

export const SubRouteList: React.FC<SubRouteListProps> = ({
	//ui
	boxProps,
	list = [],
}) => {
	const router = useRoutes();

	return (
		<div {...boxProps}>
			<div className='p-4 rounded-[12px] min-h-[40px] text-[14px] bg-background-primary flex flex-col gap-2 select-none'>
				{(list || []).map((route, i) => {
					const isActive = route?.activePath ? route.activePath.test(router.pathname) : false;

					return (
						<div
							key={i}
							className={`w-full py-2 px-2 rounded-[8px] flex items-center gap-2 cursor-pointer ${isActive ? 'bg-background-secondary' : 'text-text-tertiary'}`}
							onClick={() => router.push(route.path || '')}
						>
							<i className={`fa fa-circle !text-[4px] ${isActive ? 'text-primary-1' : 'text-text-tertiary'}`} />
							<span>{route?.name || ''}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SubRouteList;
