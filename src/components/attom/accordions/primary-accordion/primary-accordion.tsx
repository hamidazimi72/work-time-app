import React from 'react';

export type PrimaryAccordionProps = {
	children?: any;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	iconProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
	rounded?: string;
	border?: string;
	expandBorderColor?: string;
	collapseBorderColor?: string;
	disabledBorderColor?: string;
	// logic
	collapse?: boolean;
	disabled?: boolean;
	onChange?: ((collapse: boolean) => any) | null;
};

export const PrimaryAccordion: React.FC<PrimaryAccordionProps> = ({
	children,
	//ui
	boxProps,
	iconProps,
	rounded = 'rounded-lg',
	border = 'border-2',
	expandBorderColor = 'border-[#0004]',
	collapseBorderColor = 'border-[#0002]',
	disabledBorderColor = 'border-[#0001]',
	//logic
	collapse = true,
	disabled = false,
	onChange = () => {},
}) => {
	const header = children?.[0] || null;
	const body = (!collapse && children?.[1]) || null;

	const borderClass = `${border} ${
		(disabled && disabledBorderColor) || (collapse && collapseBorderColor) || (!collapse && expandBorderColor) || ''
	}`;

	return (
		<div
			{...boxProps}
			className={`${boxProps?.className || ''} ${borderClass} ${rounded || ''} ${disabled ? '' : 'cursor-pointer'} relative`}
			onClick={() => onChange && !disabled && onChange(!collapse)}
		>
			{!disabled && (
				<i
					{...iconProps}
					className={`${iconProps?.className || ''} fa fa-lg ${
						collapse ? 'fa-caret-down' : 'fa-caret-up'
					} font-bold absolute left-[8px] top-[calc(50%_-_8px)]`}
				/>
			)}
			{header}
			<div>{body}</div>
		</div>
	);
};

export default PrimaryAccordion;
