import { useEffect, useState } from 'react';

import { Block } from '@attom';

import CS from './animate.module.scss';

export type AnimateProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLDivElement>;

	mode_opacity?: 'fade' | null;
	mode_enter?: 'top' | 'right' | 'left' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | null;
	mode_zoom?: 'in' | 'out' | null;

	renderBeforAnimate?: boolean;
	hideOverflow?: boolean;
	delay?: number | string;
};

export const Animate: React.FC<AnimateProps> = ({
	children,
	// classNames
	boxProps,
	elProps,

	mode_opacity = null,
	mode_enter = null,
	mode_zoom = null,
	// custom
	renderBeforAnimate = false,
	delay = '0',
}) => {
	//hooks:
	const [status, setStatus] = useState('init');

	useEffect(() => {
		setTimeout(() => {
			setStatus('finish');
		}, +delay || 100);
	}, []);

	//variables and functions:
	const modeAttr = {
		opacity: (mode_opacity === 'fade' && '_opacity-fade_') || '',
		enter:
			(mode_enter === 'top' && '_enter-top_') ||
			(mode_enter === 'right' && '_enter-right_') ||
			(mode_enter === 'left' && '_enter-left_') ||
			(mode_enter === 'bottom' && '_enter-bottom_') ||
			(mode_enter === 'top-right' && '_enter-top-right_') ||
			(mode_enter === 'top-left' && '_enter-top-left_') ||
			(mode_enter === 'bottom-right' && '_enter-bottom-right_') ||
			(mode_enter === 'bottom-left' && '_enter-bottom-left_') ||
			'',
		zoom: (mode_zoom === 'in' && '_zoom-in_') || (mode_zoom === 'out' && '_zoom-out_') || '',
	};
	return (
		<Block
			boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container} relative transition-all duration-500` }}
			data-mode={`${modeAttr.opacity} ${modeAttr.enter} ${modeAttr.zoom}`}
			data-render={status}
		>
			{!renderBeforAnimate && status !== 'finish' ? null : <div {...elProps}>{children}</div>}
		</Block>
	);
};

export default Animate;
