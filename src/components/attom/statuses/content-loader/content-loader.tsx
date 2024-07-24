import { icons } from '@data';

export type ContentLoaderProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	boxPosition?: 'absolute' | 'fixed' | 'relative' | 'static';
	boxBackdropBlur?: string;
	boxOpacity?: string;
	boxBgColor?: string;
	elClass?: string;
	elSize?: string;
	elSpace?: string;
	elOpacity?: string;
};

export const ContentLoader = ({
	// Box Control
	boxProps,
	boxPosition = 'absolute',
	boxBackdropBlur = 'backdrop-blur-[2px]',
	boxOpacity = '',
	boxBgColor = '',
	// Loader Control
	elClass = '',
	elSize = 'max-h-[75%] min-h-[90px]',
	elSpace = 'm-[20px]',
	elOpacity = 'opacity-50',
}: ContentLoaderProps) => {
	return (
		<div
			{...boxProps}
			className={`${
				boxProps?.className || ''
			} ${boxPosition} ${boxOpacity} ${boxBgColor} ${boxBackdropBlur} top-0 right-0 left-0 bottom-0 pointer-events-none flex flex-col items-center justify-center select-none z-[3]`}
		>
			<img className={`${elClass} ${elSize} ${elSpace} ${elOpacity}`} alt='loader' src={icons.primaryLoader.src} />
		</div>
	);
};

export default ContentLoader;
