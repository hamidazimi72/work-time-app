import { PureBreadcrumb, PureBreadcrumbProps } from '@attom';

export type PrimaryBreadcrumbProps = PureBreadcrumbProps;

export const PrimaryBreadcrumb: React.FC<PureBreadcrumbProps> = ({
	//
	boxProps,
	pathProps,
	nameProps,
	seperatorProps,
	//
	paths = [],
}) => {
	return (
		<PureBreadcrumb
			boxProps={boxProps}
			pathProps={{
				...pathProps,
				className: `mx-[2px] text-text-tertiary last:text-primary-1 text-[13px] ${pathProps?.className || ''}`,
			}}
			nameProps={{ ...pathProps, className: `mx-1 ${nameProps?.className || ''}` }}
			seperatorProps={{ ...pathProps, className: `opacity-40 text-[10px] ${seperatorProps?.className || ''}` }}
			paths={paths}
		/>
	);
};

export default PrimaryBreadcrumb;
