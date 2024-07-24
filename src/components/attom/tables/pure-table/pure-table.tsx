import { Block } from '@attom';

import CS from './pure-table.module.scss';

export type PureTableProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const PureTable: React.FC<PureTableProps> = ({
	children,
	// box Control
	boxProps,
}) => {
	return <Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container}` }}>{children}</Block>;
};

export default PureTable;

/* <PureTable boxClass={CS.table}>
	<div className={CS.thead}>
		<div className={CS.th}>
			<div className={CS.td}>1</div>
			<div className={CS.td}>2</div>
			<div className={CS.td}>3</div>
		</div>
	</div>
	<div className={CS.tbody}>
		<div className={CS.tr}>
			<div className={CS.td}>1</div>
			<div className={CS.td}>2</div>
			<div className={CS.td}>3</div>
		</div>
	</div>
</PureTable>; */
