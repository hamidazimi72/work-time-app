import { Block, PrimaryButton, PrimaryInput, PureForm } from '@attom';
import { page_profile } from '@context';
import { useToast } from '@hooks';

export type ResetPasswordProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_profile.useContext();
	const { resetPassword } = state;
	const { _status, password, newPassword, repeatNewPassword } = resetPassword;

	const actions = page_profile.useActions();

	const { showToast } = useToast();

	const resetPasswordHanlder = () => {
		actions?.resetPasswordUser({
			okCB(res) {
				showToast({ message: 'کلمه عبور با موفقیت تغییر یافت!', showIcon: true, type: 'success' });
				overWrite({ value: { ...initState.resetPassword }, scope: 'resetPassword' });
			},
		});
	};

	return (
		<Block boxProps={boxProps}>
			<PureForm boxProps={{ className: `min-h-[100vh] p-10 flex flex-col gap-4 justify-center items-center` }}>
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='کلمه عبور فعلی'
					value={password}
					onChange={(e) => overWrite({ value: { password: e }, scope: 'resetPassword' })}
					disabled={_status === 'loading'}
					focus
				/>
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='کلمه عبور جدید'
					value={newPassword}
					onChange={(e) => overWrite({ value: { newPassword: e }, scope: 'resetPassword' })}
					disabled={_status === 'loading'}
				/>
				<PrimaryInput
					boxProps={{ className: 'w-full' }}
					label='تکرار کلمه عبور جدید'
					value={repeatNewPassword}
					onChange={(e) => overWrite({ value: { repeatNewPassword: e }, scope: 'resetPassword' })}
					disabled={_status === 'loading'}
				/>

				<PrimaryButton
					boxProps={{ className: 'w-full mt-4' }}
					content='ثبت'
					loading={_status === 'loading'}
					onClick={resetPasswordHanlder}
				/>
			</PureForm>
		</Block>
	);
};

export default ResetPassword;
