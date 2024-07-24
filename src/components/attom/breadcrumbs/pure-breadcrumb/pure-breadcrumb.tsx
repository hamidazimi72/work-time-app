import { Block, SVGIcon, SVGIcons } from '@attom';

export type PureBreadcrumbProps = {
	//
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
	nameProperty?: string;
	onClickProperty?: string;
	seperator?: string;
	paths: {
		[key: string]: any;
		name?: string;
		icon?: string;
		svgIcon?: any | SVGIcons;
		type?: string;
		onClick?: () => any;
	}[];

	pathProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
	nameProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
	seperatorProps?: React.HtmlHTMLAttributes<HTMLSpanElement>;
};

export const PureBreadcrumb: React.FC<PureBreadcrumbProps> = ({
	// box Control
	boxProps,
	pathProps,
	nameProps,
	seperatorProps,
	//
	nameProperty = 'name',
	onClickProperty = 'onClick',
	seperator = '/',
	paths = [],
}) => {
	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} flex items-center` }}>
			{paths.map((item, i) => (
				<span
					key={i}
					{...pathProps}
					className={`${pathProps?.className || ''} ${item[onClickProperty] ? 'cursor-pointer' : ''} flex items-center`}
					onClick={item[onClickProperty] ?? null}
				>
					<span {...nameProps} className={`${nameProps?.className || ''} flex items-center`}>
						{item?.type === 'back' && <SVGIcon icon='arrowDown' width='w-[18px]' boxProps={{ className: 'rotate-[-90deg]' }} />}
						{item?.icon && <i className={`${item.icon}`} />}
						{item?.svgIcon && <SVGIcon icon={item?.svgIcon} width='w-[14px]' />}
						{item[nameProperty] ?? ''}
					</span>
					{i + 1 < paths.length && <span {...seperatorProps}>{item?.type === 'back' ? '|' : seperator}</span>}
				</span>
			))}
		</Block>
	);
};

export default PureBreadcrumb;
