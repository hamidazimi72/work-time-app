import { Block } from '@attom';

export type PrimaryBarChartProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	percent?: string | number;
	emptyBgColor?: string;
	fullBgColor?: string;
	barHeight?: string;
};

export const PrimaryBarChart: React.FC<PrimaryBarChartProps> = ({
	// box Control
	boxProps,

	percent = 0,
	emptyBgColor = 'bg-primary-1',
	fullBgColor = 'bg-secondary-1',
	barHeight = 'h-4',
}: PrimaryBarChartProps) => {
	return (
		<Block boxProps={boxProps}>
			<div className={`${barHeight} ${emptyBgColor} relative overflow-hidden rounded-xl`}>
				<div className={`${barHeight} ${fullBgColor}`} style={{ width: `${+percent || 0}%` }} />
			</div>
		</Block>
	);
};

export default PrimaryBarChart;
