import Link from 'next/link';

import { Block, PrimaryButton, PrimaryInput, PureForm } from '@attom';
import { page_register } from '@context';
import { useRoutes } from '@hooks';

export type RegisterProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Register: React.FC<RegisterProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite } = page_register.useContext();
	const { _status, password, username, securityCode } = state;

	const actions = page_register.useActions();

	const { push } = useRoutes();

	const registerHanlder = () => {
		actions?.registerUser({
			okCB(res) {
				push('/apps');
			},
		});
	};

	const sendNotif = () => {
		if (!window?.Notification) {
			// Check if the browser supports notifications
			alert('This browser does not support desktop notification');
		} else if (Notification.permission === 'granted') {
			// Check whether notification permissions have already been granted;
			// if so, create a notification
			const notification = new Notification('Hi there!');
			alert('Hi there!');
			// …
		} else if (Notification.permission !== 'denied') {
			// We need to ask the user for permission
			Notification.requestPermission().then((permission) => {
				// If the user accepts, let's create a notification
				if (permission === 'granted') {
					const notification = new Notification('Hi there!');
					alert('Hi there!');
					// …
				}
			});
		}
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
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='کد امنیتی'
					value={securityCode}
					onChange={(e) => overWrite({ value: { securityCode: e } })}
					disabled={_status === 'loading'}
				/>

				<PrimaryButton
					boxProps={{ className: 'w-full mt-4' }}
					content='ثبت نام'
					loading={_status === 'loading'}
					onClick={registerHanlder}
				/>

				<PrimaryButton
					boxProps={{ className: 'w-full mt-4' }}
					content='ارسال اعلان'
					loading={_status === 'loading'}
					onClick={sendNotif}
				/>
				<Link href='/login'>ورود</Link>
			</PureForm>
		</Block>
	);
};

export default Register;
