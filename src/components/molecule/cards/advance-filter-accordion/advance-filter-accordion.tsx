import React from 'react';

export type AdvanceFilterAccordionProps = {
	children?: any;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	iconProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
	headerProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	titleProps?: React.HtmlHTMLAttributes<HTMLDivElement>;

	bgColor?: string;
	space?: string;
	border?: string;

	title?: string;
	titleBadge?: string | number;
	isFull?: boolean;
	// logic
	collapse?: boolean;
	disabled?: boolean;
	onChange?: ((collapse: boolean) => any) | null;
};

export const AdvanceFilterAccordion: React.FC<AdvanceFilterAccordionProps> = ({
	children,
	//ui
	boxProps,
	iconProps,
	headerProps,
	titleProps,

	bgColor = '',
	space = 'py-[32px] px-[24px]',
	border = 'border-b border-text-tertiary-20',

	title = '',
	titleBadge,
	isFull = false,

	//logic
	collapse = true,
	disabled = false,
	onChange = () => {},
}) => {
	const onChangeHandler = () => {
		if (disabled || !onChange) return;

		onChange(!collapse);
	};

	return (
		<div {...boxProps} className={`${boxProps?.className || ''} ${bgColor} ${border} ${space || ''} select-none relative`}>
			<div {...headerProps} className={`${headerProps?.className || ''} flex items-center gap-2`}>
				<span
					{...titleProps}
					className={`${titleProps?.className || ''} text-[16px] font-[500] ${disabled ? '' : 'cursor-pointer'}`}
					onClick={onChangeHandler}
				>
					{title || ''}
				</span>

				{(titleBadge || titleBadge === 0) && (
					<span className='rounded-full flex items-center justify-center p-1 min-w-[24px] min-h-[24px] text-[12px] font-bold bg-primary-1 text-white mx-2'>
						{titleBadge ?? ''}
					</span>
				)}

				<span className='flex items-center mr-auto gap-2'>
					{isFull && <span className='w-[8px] h-[8px] mx-2 rounded-full bg-primary-2'></span>}
					{!disabled && (
						<span
							{...iconProps}
							className={`${iconProps?.className || ''} w-[36px] h-[36px] flex items-center justify-center rounded-full border border-text-tertiary-40 cursor-pointer`}
							onClick={onChangeHandler}
						>
							<i {...iconProps} className={`fa !text-[24px] ${collapse ? 'fa-angle-down' : 'fa-angle-up pb-[2px]'}`} />
						</span>
					)}
				</span>
			</div>

			{collapse ? null : children}
		</div>
	);
};

export default AdvanceFilterAccordion;
