import { ReactElement } from 'react';

import { PrimaryPagination, PrimaryPaginationProps, PrimarySkeleton, PureTable } from '@attom';

import CS from './primary-table.module.scss';

export type PrimaryTableProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	width?: string;
	height?: string;
	loading?: boolean;
	loadingTbodyEl?: any;

	//
	paginationProps?: PrimaryPaginationProps;
};

export const PrimaryTable: React.FC<PrimaryTableProps> = ({
	children,
	// box Control
	boxProps,
	width = 'min-w-[900px]',
	height = 'max-h-[600px]',
	loading = false,
	loadingTbodyEl,

	paginationProps,
}) => {
	const header: ReactElement = children?.[0] || null;
	const tdArray: ReactElement[] = header?.props?.children ?? [];
	const tdCount = tdArray?.length || 0;

	const loadingEl = (
		<>
			{header}
			{loadingTbodyEl ? (
				loadingTbodyEl
			) : (
				<div className='min-h-[500px]'>
					{new Array(9).fill({}).map((item, i) => {
						return (
							<div key={i}>
								{new Array(tdCount).fill({}).map((item, i2) => (
									<div key={i2} data-grow={tdArray?.[i2]?.props?.['data-grow'] ?? ''}>
										<PrimarySkeleton boxProps={{ className: 'w-[50%] h-[10px] mx-auto' }} />
									</div>
								))}
							</div>
						);
					})}
				</div>
			)}
		</>
	);

	const okEl = <>{children}</>;

	return (
		<div {...boxProps} className={`${boxProps?.className || ''} rounded-[16px] border border-text-tertiary-20 overflow-hidden`}>
			<div className={`${height} overflow-y-auto overflow-x-auto`}>
				<PureTable boxProps={{ className: `${CS.container} ${width}` }}>{loading ? loadingEl : okEl}</PureTable>
			</div>

			<PrimaryPagination
				{...paginationProps}
				boxProps={{
					...paginationProps?.boxProps,
					className: `${paginationProps?.boxProps?.className || ''} ${loading ? 'opacity-75 pointer-events-none' : ''}`,
				}}
			/>
		</div>
	);
};

export default PrimaryTable;

// __________ EXAMPLE : __________ //

/* <PrimaryTable boxClass={CS.table}>
	<div className={CS.th}>
		<div className={CS.td}>1</div>
		<div className={CS.td}>2</div>
		<div className={CS.td}>3</div>
	</div>
	<div className={CS.tbody}>
		<div className={CS.tr}>
			<div className={CS.td}>1</div>
			<div className={CS.td}>2</div>
			<div className={CS.td}>3</div>
		</div>
	</div>
</PrimaryTable>; */

// __________ EXAMPLE : __________ //

/* <PrimaryTable boxClass={CS.table}>
	<div className={CS.th}>
		<div className={CS.td}>1</div>
		<div className={CS.td}>2</div>
		<div className={CS.td}>3</div>
	</div>
	<div className={CS.tbody}>
		<div className={CS.tr}>
			<div className={CS.td}>1</div>
			<div className={CS.td}>2</div>
			<div className={CS.td}>3</div>
		</div>
	</div>
</PrimaryTable>; */
