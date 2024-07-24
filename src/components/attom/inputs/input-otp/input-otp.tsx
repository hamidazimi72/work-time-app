import { useState, useRef } from 'react';

import { useDidMount } from '@hooks';
import { Block } from '@attom';

export type InputOtpProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	//
	onChange?: null | ((value: string, event: any) => any);
	value?: String;
	length?: number;
	//
	required?: boolean;
	disabled?: boolean;
	// Validation
	isValid?: boolean | null;
	validationMessage?: string | false;
	message?: string | null | JSX.Element;
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
};

export const InputOtp: React.FC<InputOtpProps> = ({
	boxProps,
	//
	onChange = (value, event) => {},
	value = '',
	length = 5,
	//
	required = false,
	disabled = false,
	// Validation
	isValid = null,
	validationMessage = null,
	message = null,
	// Background Color
	bgColor = 'bg-background-primary',
	disableBgColor = 'bg-background-tertiary',
	// Text Color
	textColor = 'text-text-secondary',
	disableTextColor = 'text-text-secondary',
	// Border Color
	focusBorderColor = 'border-text-tertiary-30',
	borderColor = 'border-text-tertiary-30',
	disableBorderColor = 'border-text-tertiary-30',
}) => {
	const [isFocus, setFocus] = useState<boolean[]>(Array(length).fill(false));
	const rf = useRef<(HTMLInputElement | null)[]>([]);

	const valueArray = new Array(length).fill(' ').map((item, i) => value[i] || '');

	const onFocusHandler = (evente: React.FocusEvent<HTMLInputElement, Element>, index: number) => {
		const newIsFocus = Array(length).fill(false);
		newIsFocus[index] = true;
		setFocus(newIsFocus);
	};

	const onBlurHandler = (evente: React.FocusEvent<HTMLInputElement, Element>, index: number) => {
		setFocus(Array(length).fill(false));
	};

	const changeInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = (event.target?.value || '').replace(' ', '') || '';

		if (/^\d{1}$/.test(value) || !value) {
			const result = valueArray.reduce((r, c, i) => `${r}${i === index ? value || ' ' : c}`, '');

			if (typeof onChange === 'function') {
				onChange(result, event);
			}

			if (value && index < rf.current.length - 1) {
				rf.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !valueArray[index] && index > 0) {
			rf.current[index - 1]?.focus();
		}
	};

	const isSuccess = isValid === true;
	const isDanger = isValid === false;

	const borderColorClass =
		(disabled && disableBorderColor) || (isSuccess && 'border-success') || (isDanger && 'border-danger') || borderColor || '';

	const bgColorClass = (disabled && disableBgColor) || bgColor || '';
	const textColorClass = (disabled && disableTextColor) || textColor || '';

	return (
		<Block {...boxProps} boxProps={{ className: '' }}>
			<div className='flex items-center justify-center gap-3 mx-auto min-w-[328px]'>
				{valueArray.map((valueArray, indexArray) => {
					return (
						<input
							className={`w-14 h-14 border-[2px] flex outline-none bg-transparent text-center text-inherit letter-spacing-2 rounded-[16px]
                             ${borderColorClass} ${bgColorClass} ${textColorClass} 
                             ${isFocus[indexArray] && !(isSuccess || isDanger) && focusBorderColor}`}
							key={indexArray}
							type='text'
							maxLength={2}
							value={valueArray}
							onChange={(e) => changeInput(e, indexArray)}
							onKeyDown={(e) => handleKeyDown(e, indexArray)}
							onFocus={(e) => onFocusHandler(e, indexArray)}
							onBlur={(e) => onBlurHandler(e, indexArray)}
							ref={(el) => {
								rf.current[indexArray] = el;
							}}
							disabled={disabled}
						/>
					);
				})}
			</div>
			{!message && !disabled && (isSuccess || isDanger || required) && (
				<div className='min-h-[20px] mt-4 text-center text-[16px] pr-2'>
					{!isSuccess && !isDanger && required && !value && (
						<span className='text-text-tertiary-70'>پر کردن این فیلد اجباری است.</span>
					)}
					{isSuccess && validationMessage && <span className='text-success'>{validationMessage || ''}</span>}
					{isDanger && validationMessage && <span className='text-danger'>{validationMessage || ''}</span>}
				</div>
			)}

			{message && typeof message === 'string' && (
				<div className='min-h-[20px] mt-4 text-center text-[16px] pr-2'>
					{<span className='text-text-tertiary-70'>{message || ''}</span>}
				</div>
			)}

			{message && typeof message !== 'string' && message}
		</Block>
	);
};

export default InputOtp;
