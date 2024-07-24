import { Block, PrimaryCheckbox, PrimaryCheckboxProps } from '@attom';

export type CheckboxCardProps = PrimaryCheckboxProps & {
	color?: 'success' | 'danger' | 'warning' | 'info' | 'cancel' | 'primary' | 'seconadry' | string;
	disabled?: boolean;
	elProps?: React.HTMLAttributes<HTMLDivElement>;
	elSpace?: string;
	checkboxProps?: React.HTMLAttributes<HTMLDivElement>;
	hideCheckBox?: boolean;
};

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
	// box control
	boxProps,
	elProps,
	elSpace = 'px-4 py-[6px]',
	color,
	checkboxProps,

	label,
	labelClass,
	value,
	onChange,
	readOnly,
	disabled,
	hideCheckBox,

	deactiveBorderColor = (color === 'success' && 'border-success') ||
		(color === 'warning' && 'border-warning') ||
		(color === 'danger' && 'border-danger') ||
		(color === 'info' && 'border-info') ||
		(color === 'cancel' && 'border-cancel') ||
		(color === 'primary' && 'border-primary-1') ||
		(color === 'secondary' && 'border-secondary-1') ||
		'border-text-tertiary-30',

	...props
}) => {
	const changeHandle = () => {
		if (!onChange || readOnly) return;
		const forrmattedValue = (!value && true) || false;
		onChange(forrmattedValue);
	};

	const bgColor =
		(color === 'success' && 'bg-success-10') ||
		(color === 'warning' && 'bg-warning-10') ||
		(color === 'danger' && 'bg-danger-10') ||
		(color === 'info' && 'bg-info-10') ||
		(color === 'cancel' && 'bg-cancel-10') ||
		(color === 'cancel' && 'bg-cancel-10') ||
		(color === 'primary' && 'bg-primary-1-10') ||
		(color === 'secondary' && 'bg-secondary-1-10') ||
		'';

	const textColor =
		(color === 'success' && 'text-success') ||
		(color === 'warning' && 'text-warning contrast-[0.9]') ||
		(color === 'danger' && 'text-danger') ||
		(color === 'info' && 'text-info') ||
		(color === 'cancel' && 'text-cancel') ||
		(color === 'primary' && 'text-primary-1') ||
		(color === 'secondary' && 'text-secondary-1') ||
		'text-text-primary';

	const borderColor =
		(color === 'success' && 'border-success') ||
		(color === 'warning' && 'border-warning') ||
		(color === 'danger' && 'border-danger') ||
		(color === 'info' && 'border-info') ||
		(color === 'cancel' && 'border-cancel') ||
		(color === 'cancel' && 'border-cancel') ||
		(color === 'primary' && 'border-primary-1') ||
		(color === 'secondary' && 'border-secondary-1') ||
		'border-text-tertiary-30';

	if (!label && !color) return null;

	return (
		<Block boxProps={boxProps}>
			<div
				{...elProps}
				className={`${elProps?.className || ''} flex items-center rounded-full border gap-2 cursor-pointer ${elSpace} ${bgColor} ${textColor} ${borderColor} ${disabled ? 'pointer-events-none opacity-75' : ''} ${readOnly ? 'pointer-events-none ' : ''}`}
				onClick={changeHandle}
			>
				{!hideCheckBox && (
					<PrimaryCheckbox
						{...props}
						boxProps={checkboxProps}
						deactiveBorderColor={deactiveBorderColor}
						value={value}
						readOnly={readOnly}
					/>
				)}
				<span className={`${labelClass || ''} text-[12px]`}>{label || ''}</span>
			</div>
		</Block>
	);
};

export default CheckboxCard;
