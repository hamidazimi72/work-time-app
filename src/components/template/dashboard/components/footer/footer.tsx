import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Block, SVGIcon } from '@attom';

type FooterProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Footer: React.FC<FooterProps> = ({
	//
	boxProps,
}) => {
	const pathname = usePathname();

	if (!/(worktime|cost|task)/.test(pathname)) return null;

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			<footer className='fixed bottom-0 max-w-screen-md w-full grid grid-cols-3 gap-x-2 rounded-t-2xl h-16 shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.03)] bg-white z-50 overflow-hidden'>
				<Link
					className={`col-span-1 flex flex-col justify-center items-center gap-1 text-sky-400 ${pathname.includes('worktime') ? `bg-sky-50` : ``}`}
					href='/apps/worktime'
				>
					<SVGIcon icon='timework_regular_rounded' width='w-5' />
					<span className='text-[11px] font-normal'>ساعت کاری</span>
				</Link>
				<Link
					className={`col-span-1 flex flex-col justify-center items-center gap-1 text-sky-400 ${pathname.includes('cost') ? `bg-sky-50` : ``}`}
					href='/apps/cost'
				>
					<SVGIcon icon='cost_regular_rounded' width='w-5' />
					<span className='text-[11px] font-normal'>هزینه‌ها</span>
				</Link>
				<Link
					className={`col-span-1 flex flex-col justify-center items-center gap-1 text-sky-400 ${pathname.includes('task') ? `bg-sky-50` : ``}`}
					href='/apps/task'
				>
					<SVGIcon icon='task_regular_rounded' width='w-5' />
					<span className='text-[11px] font-normal'>وظایف</span>
				</Link>
			</footer>
		</Block>
	);
};
