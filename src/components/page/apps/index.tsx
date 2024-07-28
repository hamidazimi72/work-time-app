import { Block } from '@attom';
import { useRoutes } from '@hooks';

export type AppsProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Apps: React.FC<AppsProps> = ({
	//
	boxProps,
}) => {
	const { push } = useRoutes();

	return (
		<Block boxProps={boxProps}>
			<div className='min-h-[calc(100vh-96px)] flex flex-col gap-8 justify-center items-center'>
				<div
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
				</div>
			</div>
		</Block>
	);
};

export default Apps;
