import { Block } from '@attom';

export type PrimaryCheckboxProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	labelClass?: string;
	activeBgColor?: string;
	activeBorderColor?: string;
	deactiveBgColor?: string;
	deactiveBorderColor?: string;
	checkTextColor?: string;
	label?: string | null;
	value?: boolean;
	onChange?: ((value: boolean) => void) | null;
	inlineBlock?: boolean;
	readOnly?: boolean;
};

export const PrimaryCheckbox: React.FC<PrimaryCheckboxProps> = ({
	// box control
	boxProps,

	activeBgColor = 'bg-primary-1',
	activeBorderColor = 'border-primary-1',
	deactiveBgColor = 'bg-transparent',
	deactiveBorderColor = 'border-text-tertiary-30',
	checkTextColor = 'text-white',

	label = '',
	labelClass = '',
	value = undefined,
	onChange = null,
	inlineBlock = false,
	readOnly = false,
}) => {
	const isCheck = Boolean(value);

	const changeHandle = () => {
		if (!onChange || readOnly) return;
		const forrmattedValue = (!value && true) || false;
		onChange(forrmattedValue);
	};

	// return jsx
	return (
		<Block boxProps={boxProps}>
			<div className='flex w-full items-center gap-2'>
				<span
					className={`${isCheck ? activeBgColor : deactiveBgColor} border ${isCheck ? activeBorderColor : deactiveBorderColor} ${
						readOnly ? '' : 'cursor-pointer'
					} flex justify-center items-center w-4 h-4 rounded-[4px] p-[2px]`}
					onClick={changeHandle}
				>
					<i
						className={`flex justify-center items-center fa fa-check !text-[11px] pt-[1px] font-light ${
							isCheck ? checkTextColor : 'text-transparent'
						}`}
					/>
				</span>
				{label && (
					<span className={`${readOnly ? '' : 'cursor-pointer'} ${labelClass}`} onClick={changeHandle}>
						{label}
					</span>
				)}
			</div>
		</Block>
	);
};

export default PrimaryCheckbox;
