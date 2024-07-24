import { Block } from '@attom';

import * as icons from './icons';

export const SVGIcons_icons = icons;

export type SVGIcons = keyof typeof icons;

export type SVGIconProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLDivElement>;

	textColor?: string;
	height?: string;
	width?: string;

	icon?: SVGIcons;
};

export const SVGIcon: React.FC<SVGIconProps> = ({
	// box Control
	boxProps,
	elProps,

	textColor = 'text-inherit',
	height = '',
	width = 'w-[20px]',

	icon,
}) => {
	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''}` }}>
			<div
				{...elProps}
				className={`${elProps?.className || ''} ${textColor} ${height} ${width}`}
				dangerouslySetInnerHTML={{
					__html: icons[icon || ''] || '',
				}}
			/>
		</Block>
	);
};

export default SVGIcon;
