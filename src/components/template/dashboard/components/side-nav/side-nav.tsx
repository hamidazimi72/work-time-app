import { SVGIcon } from '@attom';
import { template_dashboard } from '@context';
import { useDidMount, useRoutes } from '@hooks';
import { LocalStorageAPI } from '@utils';
import Link from 'next/link';
import { useRef } from 'react';

export type SideNavProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	boxSize?: string;
	enterAnimation?: string;
	leaveAnimation?: string;
	onClose?: null | (() => any);
	onCloseDisabled?: boolean;
	// render?: (onClose: () => any) => any;
	backdropDisable?: boolean;
	disableOverflowY?: boolean;

	[key: string]: any;
};

export const SideNav: React.FC<SideNavProps> = ({
	sideModal,

	boxProps,
	boxSize = 'ml-auto max-h-screen h-screen w-[80vw] lg:w-[60vw] xl:w-[40vw]',

	enterAnimation = 'animate-modal-enter-right',
	leaveAnimation = 'animate-modal-leave-right',

	onClose = null,
	onCloseDisabled = false,
	// render = undefined,
	backdropDisable = false,
	disableOverflowY = false,

	...props
}) => {
	const ref: any = useRef();

	const backdropCloseHandler = (e) => {
		if (!onCloseDisabled && !backdropDisable && ref.current && !ref.current.contains(e.target) && onClose) closeHandler();
	};

	const closeHandler = () => {
		if (!onClose || onCloseDisabled) return;
		ref?.current?.parentElement && leaveAnimation && ref.current.parentElement.classList.add(leaveAnimation);
		setTimeout(() => {
			onClose();
		}, 500);
	};

	const { push } = useRoutes();

	const exitHandler = () => {
		LocalStorageAPI?.logout();
		push('/login');
	};

	useDidMount(() => {
		const body: any = document.querySelector('body');
		body.classList.add('overflow-hidden');
		return () => {
			body.classList.remove('overflow-hidden');
		};
	});

	return (
		<div
			className={`${enterAnimation} bg-[#4443] fixed z-[999] inset-0 flex flex-col items-center overflow-hidden backdrop-blur-sm`}
			onClick={backdropCloseHandler}
		>
			<div
				{...boxProps}
				className={`px-8 pt-16 pb-8 ${boxProps?.className || ''} ${boxSize || ''} bg-background-primary ${disableOverflowY ? '' : 'overflow-y-auto'} rounded-l-2xl app-scrollbar`}
				ref={ref}
			>
				{onClose && (
					<SVGIcon
						icon='close_regular_rounded'
						textColor='text-text-tertiary hover:text-text-primary'
						width='w-4'
						boxProps={{
							onClick: closeHandler,
							className: `absolute top-4 right-4 z-[999] text-lg font-normal opacity-50 cursor-pointer hover:opacity-100 select-none`,
						}}
					/>
				)}

				<div className='flex flex-col gap-4'>
					<Link href='/profile/reset-password' className='flex gap-2 items-center text-sm'>
						<SVGIcon icon='lock_regular_rounded' width='w-5' />
						<span>تغییر رمز عبور</span>
					</Link>
					<div className='text-danger flex gap-2 items-center text-sm' onClick={exitHandler}>
						<SVGIcon icon='exit_regular_rounded' width='w-5' />
						<span>خروج</span>
					</div>
				</div>

				{/* {render && render(closeHandler || undefined)} */}
			</div>
		</div>
	);
};
