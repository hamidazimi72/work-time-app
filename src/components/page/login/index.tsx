import { Block, PrimaryButton, PrimaryInput, PureForm } from '@attom';
import { page_login } from '@context';
import { useRoutes } from '@hooks';

export type LoginProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Login: React.FC<LoginProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_login.useContext();
	const { _status, password, username } = state;

	const actions = page_login.useActions();

	const { push } = useRoutes();

	const loginHanlder = () => {
		actions?.loginUser({
			okCB(res) {
				push('/months');
			},
		});
	};

	return (
		<Block boxProps={boxProps}>
			<PureForm boxProps={{ className: `min-h-[100vh] p-10 flex flex-col gap-4 justify-center items-center` }}>
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='نام کاربری'
					value={username}
					onChange={(e) => overWrite({ value: { username: e } })}
					disabled={_status === 'loading'}
					focus
				/>
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='کلمه عبور'
					value={password}
					onChange={(e) => overWrite({ value: { password: e } })}
					disabled={_status === 'loading'}
				/>

				<PrimaryButton
					boxProps={{ className: 'w-full mt-4' }}
					content='ورود'
					loading={_status === 'loading'}
					onClick={loginHanlder}
				/>
			</PureForm>
		</Block>
	);
};

export default Login;
