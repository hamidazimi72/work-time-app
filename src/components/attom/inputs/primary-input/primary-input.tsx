import { useRef, useState } from 'react';

import { Block, SVGIcon, SVGIcons, SVGIcons_icons } from '@attom';
import { useDidMount } from '@hooks';
import { MathAPI } from '@utils';

export type PrimaryInputProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	labelProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
	//
	bgColor?: string;
	disableBgColor?: string;
	textColor?: string;
	disableTextColor?: string;
	placeholderTextColor?: string;
	borderColor?: string;
	focusBorderColor?: string;
	fillBorderColor?: string;
	disableBorderColor?: string;
	//
	textarea?: boolean;
	rows?: number | undefined;
	cols?: number | undefined;
	type?: 'text' | 'password';
	value?: string | number;
	placeholder?: string;
	label?: string;
	numeric?: boolean;
	priceMode?: boolean;
	otpMode?: boolean;
	autoComplete?: boolean;
	//
	prefix?: string | (() => any);
	prefixIcon?: boolean | SVGIcons;
	suffix?: string | (() => any);
	suffixIcon?: boolean | SVGIcons;
	//
	onChange?: null | ((value: string, event: any) => any);
	focus?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	maxLength?: number | undefined;
	ltr?: boolean;
	onFocus?: null | ((e?: any) => any);
	onBlur?: null | ((e?: any) => any);
	isValid?: boolean | null;
	validationMessage?: string | false;
	message?: string | null | JSX.Element;
};

export const PrimaryInput: React.FC<PrimaryInputProps> = ({
	children,
	boxProps,
	labelProps,
	elProps,
	// Background Color
	bgColor = 'bg-background-primary',
	disableBgColor = 'bg-background-tertiary',
	// Text Color
	textColor = 'text-text-secondary',
	disableTextColor = 'text-text-secondary',
	placeholderTextColor = 'placeholder-cancel',
	// Border Color
	borderColor = 'border-text-tertiary-30',
	focusBorderColor = 'border-text-tertiary-30',
	fillBorderColor = 'border-text-tertiary-30',
	disableBorderColor = 'border-text-tertiary-30',

	textarea = false,
	rows = 2,
	cols = 2,
	type = 'text',
	value = '',
	placeholder = '',
	label = '',

	numeric = false,
	priceMode = false,
	otpMode = false,
	autoComplete = false,

	prefix,
	prefixIcon,
	suffix,
	suffixIcon,

	onChange = null,
	focus = false,
	disabled = false,
	readOnly = false,
	required = false,
	maxLength = undefined,
	ltr,
	onFocus = null,
	onBlur = null,
	// Validation
	isValid = null,
	validationMessage = undefined,
	message = undefined,
}) => {
	//
	const rf: any = useRef();

	const [isFocus, setFocus] = useState(false);

	const onFocusHandler = (e) => {
		setFocus(true);
		onFocus && onFocus(e);
	};

	const onBlurHandler = (e) => {
		setFocus(false);
		onBlur && onBlur(e);
	};

	useDidMount(() => {
		if (focus) {
			rf.current.focus();
		}
	}, []);

	const changeInput = (e) => {
		if (priceMode) e.target.value = e.target.value.replaceAll(',', '');
		if ((numeric || priceMode || otpMode) && isNaN(e.target.value)) return;
		if (onChange) onChange(e.target.value || '', e);
	};

	const isSuccess = isValid === true;
	const isDanger = isValid === false;

	const borderColorClass =
		(disabled && disableBorderColor) ||
		(isSuccess && 'border-success') ||
		(isDanger && 'border-danger') ||
		(isFocus && focusBorderColor) ||
		(value && fillBorderColor) ||
		borderColor ||
		'';

	const bgColorClass = (disabled && disableBgColor) || bgColor || '';
	const textColorClass = (disabled && disableTextColor) || textColor || '';

	const formattedValue = (priceMode && MathAPI.seperate(value)) || value || '';

	const modeClass = (otpMode && 'letter-spacing-2') || ((numeric || priceMode || otpMode) && 'dir-X') || '';

	return (
		<Block boxProps={boxProps}>
			<div {...labelProps} className={`${labelProps?.className || ''} text-[13px] min-h-[30px] font-[500]`}>
				{label || ''}
			</div>

			<div
				className={`relative flex items-center gap-2 w-full border rounded-[12px] text-[14px] ${borderColorClass} ${bgColorClass} ${textColorClass}`}
			>
				{(prefix || typeof prefixIcon === 'string') && (
					<span
						className={`min-w-[40px] min-h-[30px] text-text-tertiary-80 text-[13px] ${typeof prefix === 'string' && !prefixIcon ? '' : 'border-l border-text-tertiary-30'} h-[full] flex items-center justify-center`}
					>
						{!prefixIcon && typeof prefix === 'string' && prefix}
						{!prefixIcon && typeof prefix === 'function' && prefix()}
						{prefixIcon === true && typeof prefix === 'string' && <i className={`${prefix}`} />}
						{typeof prefixIcon === 'string' && SVGIcons_icons[prefixIcon] && (
							<SVGIcon icon={prefixIcon as any} width='w-[25px]' />
						)}
					</span>
				)}

				{textarea ? (
					<textarea
						{...elProps}
						ref={rf}
						className={`p-3 min-h-[50px] grow w-full ${elProps?.className || ''} ${modeClass} ${ltr ? 'dir-ltr text-right' : ''} placeholder:text-[14px] placeholder:font-[300] ${placeholderTextColor} resize-none flex border-none outline-none bg-transparent text-inherit`}
						placeholder={placeholder}
						value={formattedValue}
						rows={rows}
						cols={cols}
						onChange={changeInput}
						disabled={disabled}
						readOnly={readOnly}
						onFocus={onFocusHandler}
						onBlur={onBlurHandler}
						maxLength={otpMode ? 6 : maxLength}
						autoComplete={autoComplete ? 'on' : 'off'}
					/>
				) : (
					<input
						{...elProps}
						type={type}
						ref={rf}
						className={`p-3 min-h-[50px] grow w-full ${elProps?.className || ''} ${modeClass} ${ltr ? 'dir-ltr text-right' : ''} placeholder:text-[14px] placeholder:font-[300] ${placeholderTextColor} flex border-none outline-none bg-transparent text-inherit`}
						placeholder={placeholder}
						value={formattedValue}
						onChange={changeInput}
						disabled={disabled}
						readOnly={readOnly}
						onFocus={onFocusHandler}
						onBlur={onBlurHandler}
						maxLength={otpMode ? 6 : maxLength}
						autoComplete={autoComplete ? 'on' : 'off'}
					/>
				)}

				{(suffix || typeof suffixIcon === 'string') && (
					<span
						className={`min-w-[40px] min-h-[30px] text-text-tertiary-80 text-[13px] ${typeof suffix === 'string' && !suffixIcon ? '' : ''} h-[full] flex items-center justify-center`}
					>
						{!suffixIcon && typeof suffix === 'string' && suffix}
						{!suffixIcon && typeof suffix === 'function' && suffix()}
						{suffixIcon === true && typeof suffix === 'string' && <i className={`${suffix}`} />}
						{typeof suffixIcon === 'string' && SVGIcons_icons[suffixIcon] && (
							<SVGIcon icon={suffixIcon as any} width='w-[25px]' />
						)}
					</span>
				)}
			</div>

			{!message && !disabled && (isSuccess || isDanger || required) && (
				<div className='h-[25px] flex items-end text-[12px] pr-1'>
					{!isSuccess && !isDanger && required && !value && (
						<span className='text-text-tertiary-70'>پر کردن این فیلد اجباری است.</span>
					)}
					{isSuccess && validationMessage && <span className='text-success'>{validationMessage || ''}</span>}
					{isDanger && validationMessage && <span className='text-danger'>{validationMessage || ''}</span>}
				</div>
			)}

			{message && typeof message === 'string' && (
				<div className='h-[20px] flex items-end text-[12px] pr-1'>
					{<span className='text-text-tertiary-70'>{message || ''}</span>}
				</div>
			)}

			{message && typeof message !== 'string' && message}
		</Block>
	);
};

export default PrimaryInput;
