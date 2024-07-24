import React from 'react';

export type AccordionCardProps = {
	children?: any;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	iconProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
	bgColor?: string;
	rounded?: string;
	border?: string;
	// logic
	collapse?: boolean;
	disabled?: boolean;
	onChange?: ((collapse: boolean) => any) | null;
};

export const AccordionCard: React.FC<AccordionCardProps> = ({
	children,
	//ui
	boxProps,
	iconProps,
	bgColor = 'bg-background-primary',
	rounded = 'rounded-[12px]',
	border = '',
	//logic
	collapse = true,
	disabled = false,
	onChange = () => {},
}) => {
	return (
		<div
			{...boxProps}
			className={`${boxProps?.className || ''} ${bgColor} ${border} ${rounded || ''} ${disabled ? '' : 'cursor-pointer'} select-none relative min-h-[40px] text-[14px]`}
			onClick={() => onChange && !disabled && onChange(!collapse)}
		>
			{!disabled && (
				<i
					{...iconProps}
					className={`${iconProps?.className || ''} fa text-text-tertiary ${
						collapse ? 'fa-caret-down' : 'fa-caret-up'
					} font-bold absolute left-[8px] top-[calc(50%_-_8px)]`}
				/>
			)}

			{children}
		</div>
	);
};

export default AccordionCard;
