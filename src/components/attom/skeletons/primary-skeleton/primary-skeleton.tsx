import { Block } from '@attom';

export type PrimarySkeletonProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLDivElement>;

	bgColor?: string;
	holderColorHex?: string;
	roundedClass?: string;
	shadowClass?: string;
};

export const PrimarySkeleton: React.FC<PrimarySkeletonProps> = ({
	children,
	boxProps,
	elProps,

	bgColor = 'bg-cancel-50',
	holderColorHex = '#ccc',

	roundedClass = 'rounded',
	shadowClass = 'shadow',
}) => {
	const gradient = `linear-gradient(90deg, transparent 0%, transparent 30%, ${holderColorHex} 40%, ${holderColorHex} 60%, transparent 70%, transparent 100%)`;

	return (
		<Block boxProps={boxProps}>
			<div
				{...elProps}
				className={`${elProps?.className || ''} ${bgColor} ${roundedClass} ${shadowClass} h-full w-full grow overflow-hidden`}
			>
				<div className={`animate-holder w-full h-full blur-[1px]`} style={{ background: gradient }}>
					{children}
				</div>
			</div>
		</Block>
	);
};
