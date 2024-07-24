import { Block } from '@attom';

type OptionType = { name: any; value: any; [key: string]: any };

export type PrimaryRadioButtonProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	ulProps?: React.HTMLAttributes<HTMLUListElement>;
	liProps?: React.HTMLAttributes<HTMLLIElement>;

	title?: string;
	titleProps?: React.HTMLAttributes<HTMLDivElement>;
	bgColor?: string;
	activeBgColor?: string;
	borderColor?: string;
	activeBorderColor?: string;

	labelClass?: string;
	options?: OptionType[];
	value?: any;
	onChange?: ((item: OptionType) => void) | null;
	isValid?: boolean | null;
	required?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	isVertical?: boolean;
	nameProperty?: string;
	valueProperty?: string;

	message?: string | null | JSX.Element;
	validationMessage?: string | false;
};

export const PrimaryRadioButton: React.FC<PrimaryRadioButtonProps> = ({
	boxProps,
	ulProps,
	liProps,

	title = '',
	titleProps,
	bgColor = 'bg-trnasparent',
	activeBgColor = 'bg-primary-1',
	borderColor = 'border-cancel-30',
	activeBorderColor = 'border-primary-1',
	labelClass = 'text-[15px] font-[500]',
	value = '',
	options = [],
	onChange = null,
	isValid = null,
	required = false,
	readOnly = false,
	disabled = false,
	isVertical = false,
	nameProperty = 'name',
	valueProperty = 'value',

	message,
	validationMessage,
}) => {
	const changeHandle = (item: OptionType) => {
		if (!onChange || readOnly || disabled) return;
		onChange(item);
	};

	const isSuccess = isValid === true;
	const isDanger = isValid === false;

	// return jsx
	return (
		<Block boxProps={boxProps}>
			{title && (
				<div {...titleProps} className={`${titleProps?.className || ''} text-[13px] min-h-[30px] font-[500]`}>
					{title || ''}
				</div>
			)}
			<ul
				{...ulProps}
				className={`${ulProps?.className || ''} flex flex-wrap w-full ${isVertical ? 'flex-col gap-2' : 'items-center gap-6 min-h-[50px]'} ${disabled ? `cursor-not-allowed pointer-events-none opacity-70` : ``}`}
			>
				{options.map((item, i) => {
					const isActive = item[valueProperty] === value || false;

					return (
						<li
							key={i}
							{...liProps}
							className={`${liProps?.className || ''} cursor-pointer flex items-center gap-2 ${disabled ? `cursor-not-allowed` : ``}`}
							onClick={() => changeHandle(item)}
						>
							<span
								className={`rounded-full w-4 h-4 border flex items-center justify-center ${isActive ? activeBorderColor : borderColor}`}
							>
								<span className={`h-2 w-2 ${isActive ? activeBgColor : bgColor} rounded-full`}></span>
							</span>
							<span className={labelClass}>{item[nameProperty] || ''}</span>
						</li>
					);
				})}
			</ul>

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

export default PrimaryRadioButton;
