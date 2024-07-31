import { Block } from '@attom';
import { template_dashboard, universal_account } from '@context';
import { useRoutes } from '@hooks';
import { LocalStorageAPI } from '@utils';

type HeaderProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Header: React.FC<HeaderProps> = ({
	//
	boxProps,
}) => {
	const { state } = template_dashboard.useContext();

	const { state: accountState } = universal_account.useContext();
	const { username } = accountState;

	const { push } = useRoutes();

	const exitHandler = () => {
		LocalStorageAPI?.logout();
		push('/login');
	};

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			<header className='fixed top-0 max-w-screen-md w-full flex justify-between items-center rounded-b-2xl h-16 p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] bg-[#ffffffc0] backdrop-blur-md z-50'>
				<span>{username}</span>
				<span className='text-danger text-sm' onClick={exitHandler}>
					خروج
				</span>
			</header>
		</Block>
	);
};
