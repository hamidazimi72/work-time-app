// import { Block, SVGIcon } from '@attom';

// export type SideModalHeaderProps = {
// 	// ui
// 	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
// 	//
// 	title?: string;
// 	space?: string;
// 	border?: string;
// 	//
// 	onMaximize?: () => any;
// 	disableMaximize?: boolean;
// 	hideMaximize?: boolean;

// 	onClose?: () => any;
// 	disableClose?: boolean;
// 	hideClose?: boolean;
// };

// export const SideModalHeader: React.FC<SideModalHeaderProps> = ({
// 	// ui
// 	boxProps,
// 	//
// 	title,
// 	space = 'py-[32px] px-[24px]',
// 	border = 'border-b border-text-tertiary-20',
// 	//
// 	onMaximize,
// 	disableMaximize,
// 	hideMaximize,
// 	//
// 	onClose,
// 	disableClose,
// 	hideClose,
// }) => {
// 	return (
// 		<Block
// 			boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${space} ${border} flex items-center justify-between` }}
// 		>
// 			<div className='font-[700] text-[20px]'>{title || ''}</div>
// 			<div className='flex items-center gap-[22px]'>
// 				{!hideMaximize && onMaximize && (
// 					<SVGIcon
// 						icon='maximize'
// 						textColor='text-cancel-70 hover:text-cancel'
// 						width='w-[24px]'
// 						boxProps={{
// 							onClick: onMaximize,
// 							className: `cursor-pointer ${disableMaximize ? 'pointer-events-none' : ''}`,
// 						}}
// 					/>
// 				)}
// 				{!hideClose && onClose && (
// 					<SVGIcon
// 						icon='close'
// 						textColor='text-cancel-70 hover:text-cancel'
// 						width='w-[28px]'
// 						boxProps={{
// 							onClick: onClose,
// 							className: `cursor-pointer ${disableClose ? 'pointer-events-none' : ''}`,
// 						}}
// 					/>
// 				)}
// 			</div>
// 		</Block>
// 	);
// };
// export default SideModalHeader;
