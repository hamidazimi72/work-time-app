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
			<div className='min-h-[100vh] p-8 flex flex-col gap-8 justify-center items-center'>
				<div
					className='w-full flex flex-1 justify-center items-center border border-cyan-400 rounded-lg'
					onClick={() => push('/apps/worktime')}
				>
					ساعت کاری
				</div>
				<div
					className='w-full flex flex-1 justify-center items-center border border-cyan-400 rounded-lg'
					onClick={() => push('/apps/cost')}
				>
					مدیریت هزینه‌ها
				</div>
				<div
					className='w-full flex flex-1 justify-center items-center border border-cyan-400 rounded-lg'
					onClick={() => push('/apps/task')}
				>
					مدیریت کارها
				</div>
			</div>
		</Block>
	);
};

export default Apps;
