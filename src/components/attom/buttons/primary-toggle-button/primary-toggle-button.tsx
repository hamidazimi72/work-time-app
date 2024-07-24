import { Block } from '@attom';

export type PrimaryToggleButtonProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	elClass?: string;
	activeBgColor?: string;
	activeBgColor2?: string;
	deactiveBgColor?: string;
	deactiveBgColor2?: string;
	value?: boolean | 'N' | 'Y' | '';
	onChange?: ((value: boolean | 'Y' | 'N') => void) | null;
	inlineBlock?: boolean;
	readOnly?: boolean;
};

export const PrimaryToggleButton: React.FC<PrimaryToggleButtonProps> = ({
	// box control
	boxProps,

	elClass = '',
	activeBgColor = 'bg-primary-1',
	activeBgColor2 = 'bg-secondary-1',
	deactiveBgColor = 'bg-primary-1',
	deactiveBgColor2 = 'bg-secondary-1',

	value = '',
	onChange = null,
	readOnly = false,
	inlineBlock = true,
}) => {
	const isActive = !(!value || value === 'N');

	const changeHandle = () => {
		if (!onChange || readOnly) return;
		const forrmattedValue = (value === 'N' && 'Y') || (value === 'Y' && 'N') || (!value && true) || false;
		onChange(forrmattedValue);
	};

	// return jsx
	return (
		<Block boxProps={boxProps}>
			<div className='flex items-center justify-center'>
				<span
					className={`${elClass} ${
						isActive ? activeBgColor : deactiveBgColor
					} relative flex justify-center items-center w-full h-5 rounded-xl select-none transition-all cursor-pointer`}
					onClick={changeHandle}
				>
					<span
						className={`${isActive ? activeBgColor2 : deactiveBgColor2} ${
							isActive ? 'right-[-4px]' : 'left-[-4px]'
						} absolute w-7 h-7 rounded-full`}
					></span>
				</span>
			</div>
		</Block>
	);
};

export default PrimaryToggleButton;
