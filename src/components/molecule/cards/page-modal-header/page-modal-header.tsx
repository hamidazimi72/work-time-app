// import { Block, SVGIcon } from '@attom';

// export type PageModalHeaderProps = {
// 	// ui
// 	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
// 	//
// 	title?: string;
// 	space?: string;
// 	//
// 	onMinimize?: () => any;
// 	disableMinimize?: boolean;
// 	hideMinimize?: boolean;

// 	onEdit?: () => any;
// 	disableEdit?: boolean;
// 	hideEdit?: boolean;
// };

// export const PageModalHeader: React.FC<PageModalHeaderProps> = ({
// 	// ui
// 	boxProps,
// 	//
// 	title,
// 	space = '',
// 	//
// 	onMinimize,
// 	disableMinimize,
// 	hideMinimize,
// 	//
// 	onEdit,
// 	disableEdit,
// 	hideEdit,
// }) => {
// 	return (
// 		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${space} flex items-center justify-between` }}>
// 			<div className='font-[700] text-[20px]'>{title || ''}</div>
// 			<div className='flex items-center gap-[22px]'>
// 				{!hideEdit && onEdit && (
// 					<div
// 						className={`text-primary-1 flex items-center gap-2 cursor-pointer ${disableEdit ? 'pointer-events-none' : ''}`}
// 						onClick={onEdit}
// 					>
// 						<SVGIcon icon='edit' width='w-[24px]' />
// 						<span className='text-[16px]'>ویرایش</span>
// 					</div>
// 				)}
// 				{!hideMinimize && onMinimize && (
// 					<SVGIcon
// 						icon='minimize'
// 						textColor='text-cancel-70 hover:text-cancel'
// 						width='w-[24px]'
// 						boxProps={{
// 							onClick: onMinimize,
// 							className: `cursor-pointer ${disableMinimize ? 'pointer-events-none' : ''}`,
// 						}}
// 					/>
// 				)}
// 			</div>
// 		</Block>
// 	);
// };
// export default PageModalHeader;
