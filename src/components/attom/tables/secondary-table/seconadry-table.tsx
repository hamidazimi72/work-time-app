import { PrimarySkeleton, PrimaryTable, PrimaryTableProps } from '@attom';

export type SecondaryTableProps = PrimaryTableProps & {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	thProps?: React.HTMLAttributes<HTMLDivElement>;
	tbodyProps?: React.HTMLAttributes<HTMLDivElement>;
	trProps?: React.HTMLAttributes<HTMLDivElement>;
	tdProps?: React.HTMLAttributes<HTMLDivElement>;

	headers?: (string | { children: any; props?: React.HTMLAttributes<HTMLDivElement> & { 'data-grow'?: string | number } })[];
	list?: any[];
	listItemRender?: (item: any, i: number) => any[] | { children: any; props?: React.HTMLAttributes<HTMLDivElement> }[];

	loading?: boolean;
};

export const SecondaryTable: React.FC<SecondaryTableProps> = ({
	// box Control
	boxProps,

	thProps,
	tbodyProps,
	trProps,
	tdProps,

	headers = [],
	list = [],
	listItemRender,

	loading = false,

	...props
}) => {
	return (
		<PrimaryTable
			boxProps={boxProps}
			{...props}
			loading={loading}
			loadingTbodyEl={
				<div {...tbodyProps}>
					{new Array((list || []).length || 1).fill({}).map((item, i) => (
						<div key={i} {...trProps}>
							{new Array(headers.length || 1).fill({}).map((item, i2) => (
								<div key={i2} data-grow={(headers as any)?.[i2]?.props?.['data-grow'] ?? ''}>
									<PrimarySkeleton boxProps={{ className: 'w-[50%] h-[10px] mx-auto' }} />
								</div>
							))}
						</div>
					))}
				</div>
			}
		>
			<div {...thProps}>
				{headers.map((item, i) =>
					typeof item === 'string' ? (
						<div key={i} {...tdProps}>
							{item}
						</div>
					) : (
						<div key={i} {...tdProps} {...item?.props} className={`${tdProps?.className || ''} ${item?.props?.className || ''}`}>
							{item?.children || ''}
						</div>
					),
				)}
			</div>

			<div {...tbodyProps}>
				{(list || []).map((item, i) => (
					<div key={i} {...trProps}>
						{listItemRender &&
							listItemRender(item, i).map((cell, i2) =>
								typeof cell === 'string' || typeof cell === 'number' || !cell ? (
									<div key={i2}>{cell ?? ''}</div>
								) : (
									<div key={i2} {...cell?.props}>
										{cell?.children ?? ''}
									</div>
								),
							)}
					</div>
				))}
			</div>
		</PrimaryTable>
	);
};

export default SecondaryTable;

// __________ EXAMPLE : __________ //

// <SecondaryTable
// headers={['key', 'name', 'value']}
// list={list}
// listItemRender={(item: (typeof list)[0], i) => [i + 1, item?.children, item?.value]}
// />

// <SecondaryTable
// headers={[
// { children: 'key', props: { className: 'bg-[#f004]' } },
// { children: 'name', props: { className: 'bg-[#0f04]' } },
// { children: 'value', props: { className: 'bg-[#00f4]' } },
// ]}
// list={list}
// listItemRender={(item: (typeof list)[0], i) => [
// { children: <span>{i + 1}</span>, props: { className: 'bg-[#00f4]' } },
// { children: item?.name, props: { className: 'bg-[#0f04]' } },
// { children: <span>{item?.value}</span>, props: { className: 'bg-[#f004]' } },
// ]}
// />
