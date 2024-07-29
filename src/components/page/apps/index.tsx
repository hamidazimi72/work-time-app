import { ReactNode } from 'react';

import { Block, SVGIcon } from '@attom';
import { useRoutes } from '@hooks';

export type AppCardProps = {
	title: string;
	icon: ReactNode;
	path: string;
	className?: string;
};

const AppCard: React.FC<AppCardProps> = ({ title, icon, path, className }) => {
	const { push } = useRoutes();

	return (
		<div
			className={`w-full flex flex-col gap-4 flex-1 justify-center items-center  border-2 rounded-lg ${className}`}
			onClick={() => push(path)}
		>
			{icon}
			{title}
		</div>
	);
};

export type AppsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Apps: React.FC<AppsProps> = ({
	//
	boxProps,
}) => {
	return (
		<Block boxProps={boxProps}>
			<div className='min-h-[calc(100vh-96px)] flex flex-col gap-4 justify-center items-center'>
				<AppCard
					title='ساعت کاری'
					icon={<SVGIcon icon='timework_regular_rounded' width='w-8' />}
					path='/apps/worktime'
					className='bg-cyan-50 text-cyan-400 border-cyan-400'
				/>
				<AppCard
					title='مدیریت هزینه‌ها'
					icon={<SVGIcon icon='cost_regular_rounded' width='w-8' />}
					path='/apps/cost'
					className='bg-emerald-50 text-emerald-400 border-emerald-400'
				/>
				<AppCard
					title='مدیریت وظایف'
					icon={<SVGIcon icon='task_regular_rounded' width='w-8' />}
					path='/apps/task'
					className='bg-purple-50 text-purple-400 border-purple-400'
				/>
				{/* <div
					className='w-full flex flex-1 justify-center items-center text-lg text-cyan-400 border-2 border-cyan-400 rounded-lg'
					onClick={() => push('/apps/worktime')}
				>
					ساعت کاری
				</div>
				<div
					className='w-full flex flex-1 justify-center items-center text-lg text-emerald-400 border-2 border-emerald-400 rounded-lg'
					onClick={() => push('/apps/cost')}
				>
					مدیریت هزینه‌ها
				</div>
				<div
					className='w-full flex flex-1 justify-center items-center text-lg text-purple-400 border-2 border-purple-400 rounded-lg'
					onClick={() => push('/apps/task')}
				>
					مدیریت کارها
				</div> */}
			</div>
		</Block>
	);
};

export default Apps;
