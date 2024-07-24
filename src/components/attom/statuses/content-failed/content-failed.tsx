export type ContentFailedProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	boxBackdropBlur?: string;
	boxOpacity?: string;
	boxBgColor?: string;
	elClass?: string;
	elSize?: string;
	elSpace?: string;
	elOpacity?: string;
	onReload?: (() => any) | null;
};

export const ContentFailed: React.FC<ContentFailedProps> = ({
	// Box Control
	boxProps,
	boxBackdropBlur = 'backdrop-blur-[2px]',
	boxOpacity = '',
	boxBgColor = '',
	// Loader Control
	elClass = '',
	elSize = 'max-h-[75%] min-h-[90px]',
	elSpace = 'm-[20px]',
	elOpacity = 'opacity-50',
	onReload = null,
}) => {
	return (
		<div
			{...boxProps}
			className={`${
				boxProps?.className || ''
			} ${boxOpacity} ${boxBgColor} ${boxBackdropBlur} absolute bg-[#f003] top-0 right-0 left-0 bottom-0 flex flex-col items-center  gap-4justify-center select-none z-[4]`}
		>
			<div className={`${elClass} ${elSize} ${elSpace} ${elOpacity} w-full flex flex-col items-center justify-center gap-3`}>
				{onReload && <i className='cursor-pointer fa fa-refresh fa-lg hover:animate-spin' onClick={onReload} />}
				<span className='animate-pulse'>خطایی پیش آمده</span>
			</div>
		</div>
	);
};

export default ContentFailed;
