import { AccordionCard, Block, SVGIcon } from '@attom';
import { template_main } from '@context';
import { useRoutes } from '@hooks';
import { SubRouteList } from '@molecule';

type SideNavProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const SideNav: React.FC<SideNavProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = template_main.useContext();
	const { collapseSubMenu, subMenuActiveRoutes } = state;

	const router = useRoutes();

	const changeStateHandler = (obj: Partial<typeof state>) => overWrite({ value: { ...obj }, scope: '' });
	const changeSubMenoActiveRoutesHandler = (obj: Partial<typeof subMenuActiveRoutes>) =>
		overWrite({ value: { ...obj }, scope: 'subMenuActiveRoutes' });

	const selectMainRoute = (mainRoute) => {};
	const selectAvatar = () => {};

	const insuranceRoutes = {
		health: [
			{
				name: 'اطلاعات پایه',
				path: '/health-basic/design',
				activePath: /^\/health-basic\W{0,1}/,
			},
			{
				name: 'قرارداد ها',
				path: '/health-contract',
				activePath: /^\/health-contract\W{0,1}/,
			},
			{
				name: 'لیست بیمه نامه',
				path: '/health-insurance',
				activePath: /^((\/\W{0,1}$)|(\/[?]{1})|(\/health-insurance\W{0,1}))/,
			},
			{
				name: 'لیست الحاقیه ها',
				path: '/health-endorsement',
				activePath: /^\/health-endorsement\W{0,1}/,
			},
		],
	};

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} flex min-h-[100vh] relative` }}>
			{collapseSubMenu && (
				<div
					className='flex items-center justify-center min-h-[100vh] h-full w-[20px] cursor-pointer text-text-tertiary hover:text-text-primary [&:hover_svg]:scale-125'
					onClick={() => changeStateHandler({ collapseSubMenu: !collapseSubMenu })}
				>
					<SVGIcon
						icon='chevronTop'
						width='w-[20px]'
						boxProps={{
							className: 'rotate-[-90deg]',
						}}
					/>
				</div>
			)}

			<div
				className={`${!collapseSubMenu ? 'grow animate-opacity-enter py-[40px] px-[20px] border-l border-text-tertiary-10' : 'w-[0px] overflow-hidden'}`}
			>
				{!collapseSubMenu && (
					<div>
						<div className='flex items-center justify-between '>
							<span className='text-[18px] cursor-pointer' onClick={() => router.push('/login')}>
								بیمه نامه ها
							</span>

							<SVGIcon
								icon='layout'
								width='w-[20px]'
								boxProps={{
									className: 'cursor-pointer text-text-tertiary',
									onClick: () => changeStateHandler({ collapseSubMenu: !collapseSubMenu }),
								}}
							/>
						</div>

						{/* Health */}
						<div className='pt-[40px]'>
							<AccordionCard
								boxProps={{ className: 'flex items-center px-3' }}
								collapse={!subMenuActiveRoutes['health']}
								onChange={(value) => changeSubMenoActiveRoutesHandler({ health: !value })}
							>
								<span className='text-[15px] font-[600] py-3'>درمان</span>
							</AccordionCard>

							{subMenuActiveRoutes['health'] && <SubRouteList boxProps={{ className: 'pt-2' }} list={insuranceRoutes.health} />}
						</div>
					</div>
				)}
			</div>
		</Block>
	);
};
