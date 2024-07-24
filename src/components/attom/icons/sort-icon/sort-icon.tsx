import { Block } from '@attom';

export type SortIconProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	value?: string;
	ascName?: string;
	descName?: string;
	onChange?: ((value?: string) => any) | null;
	class_icon?: string;
};

export const SortIcon: React.FC<SortIconProps> = ({
	children,
	// box Control
	boxProps,

	value = '',
	ascName = '',
	descName = '',
	onChange = null,

	class_icon = 'ml-2',
}) => {
	const sortIcon =
		(value && value === ascName && 'fa-sort-asc') || (value && value === descName && 'fa-sort-desc') || 'fa-sort opacity-70';

	const sortAction = () => {
		if (!onChange) return;
		if ((!value || (value !== ascName && value !== descName)) && ascName) onChange(ascName);
		else if (!value && descName) onChange(descName);
		else if (value === ascName && descName) onChange(descName);
		else if (value === ascName && !descName) onChange('');
		else if (value === descName) onChange('');
	};

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} cursor-pointer select-none`, onClick: sortAction }}>
			<i className={`fa ${sortIcon} ${class_icon}`} onClick={() => onChange && sortAction()} />
			{children}
		</Block>
	);
};

export default SortIcon;
