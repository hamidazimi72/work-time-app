import { useRef, useState } from 'react';

import { useDidMount } from '@hooks';
import { SVGIcon } from '@attom';

export type PureModalProps = {
	children?: any;
	backdropBgColor?: string;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	boxSize?: string;
	boxBgColor?: string;
	closeIconClass?: string;
	closeIconPosition?: string;
	closeIconTextColor?: string;
	fullscreenIconClass?: string;
	fullscreenIconPosition?: string;
	fullscreenIconTextColor?: string;
	enterAnimation?: string;
	leaveAnimation?: string;
	onClose?: null | (() => any);
	onCloseDisabled?: boolean;
	render?: (onClose: () => any) => any;
	backdropDisable?: boolean;
	hideCloseIcon?: boolean;
	disableOverflowY?: boolean;
	fullscreenEnable?: boolean;
	sideModal?: boolean;

	[key: string]: any;
};

export const PureModal: React.FC<PureModalProps> = ({
	children,

	backdropBgColor = 'bg-[#4448]',
	sideModal,

	boxProps,
	boxSize = sideModal
		? 'mr-auto max-h-[100vh] h-[100vh] w-[80vw] lg:w-[60vw] xl:w-[40vw]'
		: 'max-h-[90vh] max-w-[95vw] min-w-[90vw] sm:min-w-[75vw] md:min-w-[60vw] lg:min-w-[40vw]',
	boxBgColor = 'bg-background-primary',

	closeIconClass = '',
	closeIconPosition = 'left-4 top-4',
	closeIconTextColor = '',
	fullscreenIconClass = '',
	fullscreenIconPosition = 'left-10 top-4',
	fullscreenIconTextColor = '',

	enterAnimation = sideModal ? 'animate-modal-enter-left' : 'animate-modal-enter',
	leaveAnimation = sideModal ? 'animate-modal-leave-left' : 'animate-modal-leave',

	onClose = null,
	onCloseDisabled = false,
	render = undefined,
	backdropDisable = false,
	hideCloseIcon = false,
	disableOverflowY = false,
	fullscreenEnable = false,

	...props
}) => {
	const ref: any = useRef();

	const [fullscreen, setFullscreen] = useState(false);

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

	useDidMount(() => {
		const body: any = document.querySelector('body');
		body.classList.add('overflow-hidden');
		return () => {
			body.classList.remove('overflow-hidden');
		};
	});

	return (
		<div
			className={`${backdropBgColor} ${enterAnimation} fixed z-[999] top-0 bottom-0 right-0 left-0 py-10 flex flex-col items-center justify-end overflow-hidden backdrop-blur-md`}
			onClick={backdropCloseHandler}
		>
			<div
				{...boxProps}
				className={`${boxProps?.className || ''} ${
					fullscreen ? 'w-[100vw] h-[100vh] top-0 left-0' : `${boxSize || ''}`
				} ${boxBgColor}  ${disableOverflowY ? '' : 'overflow-y-auto'} ${fullscreen ? 'fixed' : 'relative'} rounded-lg app-scrollbar`}
				ref={ref}
			>
				{!hideCloseIcon && onClose && (
					<SVGIcon
						icon='close_regular_rounded'
						textColor='text-text-tertiary hover:text-text-primary'
						width='w-4'
						boxProps={{
							onClick: closeHandler,
							className: `${closeIconClass} ${closeIconPosition} ${closeIconTextColor} absolute z-[999] text-lg font-normal opacity-50 cursor-pointer hover:opacity-100 select-none`,
						}}
					/>
				)}
				{fullscreenEnable && (
					<i
						className={`${fullscreenIconClass} ${fullscreenIconPosition} ${fullscreenIconTextColor} fa ${
							fullscreen ? 'fa-window-restore' : 'fa-window-maximize'
						} absolute z-[999] text-lg font-normal opacity-50 cursor-pointer hover:opacity-100 select-none`}
						onClick={() => setFullscreen(!fullscreen)}
					/>
				)}
				{children}
				{render && render(closeHandler || undefined)}
			</div>
		</div>
	);
};

export default PureModal;
