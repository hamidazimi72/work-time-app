import { Block } from '@attom';

import { MouseEventHandler } from 'react';

export type PrimaryButtonProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLButtonElement>;
	bgColor?: string;
	color?: 'primary-1-outline' | 'primary-2-outline' | 'secondary-1-outline' | 'cancel-outline';
	textColor?: string;
	rounded?: string | boolean;
	icon?: string | null | (() => any);
	content?: string;
	contentClass?: string;
	loading?: boolean | null;
	onClick?: MouseEventHandler | undefined;
	disabled?: boolean;
	grayscaleDisabled?: boolean;
	inlineBlock?: boolean;
	labelSpace?: boolean;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	children,
	//
	boxProps,
	elProps,
	bgColor = 'bg-primary-2',
	color = '',
	textColor = 'text-[#fff]',
	rounded = 'rounded-[12px]',
	// custom props
	icon = null,
	content = '',
	contentClass = '',
	loading = null,
	onClick = undefined,
	disabled = false,
	grayscaleDisabled = false,
	inlineBlock = false,
	labelSpace,
}) => {
	// return jsx

	const bgColorClass =
		(color === 'primary-1-outline' &&
			'bg-transparent !border-solid border border-primary-1 hover:bg-primary-1 text-primary-1 hover:text-white') ||
		(color === 'primary-2-outline' &&
			'bg-transparent !border-solid border border-primary-2 hover:bg-primary-2 text-primary-2 hover:text-white') ||
		(color === 'cancel-outline' &&
			'bg-transparent !border-solid border border-cancel hover:bg-cancel text-cancel hover:text-white') ||
		bgColor;

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${labelSpace ? 'pt-[30px]' : ''}` }}>
			<button
				{...elProps}
				className={`min-h-[48px] px-4 flex items-center justify-center relative ${bgColorClass} ${textColor} ${inlineBlock ? '' : 'w-full'} ${
					disabled ? `${grayscaleDisabled ? 'grayscale-[50%] opacity-50 sepia-[50%] ' : 'opacity-70'}` : ''
				}
			  ${typeof rounded === 'boolean' ? 'rounded-[24px]' : rounded} outline-none border-none text-center cursor-pointer text-[14px]
				font-[inherit] hover:contrast-[1.1] hover:drop-shadow-md  hover:shadow-sm disabled:cursor-no-drop ${elProps?.className || ''}`}
				onClick={loading ? undefined : onClick}
				disabled={loading || disabled}
			>
				{loading && (
					<span className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
						<i className='fa fa-spinner fa-lg fa-pulse fa-spin' />
					</span>
				)}

				<span className={`flex items-center justify-center whitespace-nowrap ${contentClass} ${loading ? '!opacity-0' : ''}`}>
					{icon && typeof icon === 'function' && icon()}
					{icon && typeof icon === 'string' && <i className={`mx-6px fa pt-2px ${icon}`} />}
					{content}
					{children}
				</span>
			</button>
		</Block>
	);
};

export default PrimaryButton;
