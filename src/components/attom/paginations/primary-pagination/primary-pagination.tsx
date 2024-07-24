import { Block } from '@attom';

export type PrimaryPaginationProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;

	onChange?: null | ((index: number) => any);
	pageSize?: number;
	pageIndex?: number;
	itemIndex?: number;
	total?: number;
	elClass?: string;
	bgColor?: string;
	borderColor?: string;
	buttonClass?: string;
	buttonBgColor?: string;
	buttonTextColor?: string;
	currentButtonBgColor?: string;
	currentTextColor?: string;
	jumpButtonBgColor?: string;
	jumpButtonTextColor?: string;
};

export const PrimaryPagination: React.FC<PrimaryPaginationProps> = ({
	// box Control
	boxProps,
	//
	onChange = null,
	pageSize = 10,
	pageIndex = 0,
	itemIndex = 0,
	total = 0,

	elClass = '',
	bgColor = 'bg-transparent',
	borderColor = 'border-text-tertiary-20',

	buttonClass = 'p-1',

	buttonBgColor = 'bg-transparent',
	buttonTextColor = 'text-text-secondary',

	currentButtonBgColor = 'bg-background-tertiary',
	currentTextColor = 'text-text-primary',

	jumpButtonBgColor = 'bg-transparent',
	jumpButtonTextColor = 'text-text-secondary',
}) => {
	//

	const pageCount = Math.ceil(total / pageSize);
	const currentPage = pageIndex || Math.floor((itemIndex + pageSize - 1) / pageSize);

	const pageButtonSize = 3;

	const prevPageCount = currentPage - 1 > pageButtonSize ? pageButtonSize : currentPage - 1;
	const nextPageCount = pageCount - pageButtonSize >= currentPage ? pageButtonSize : pageCount - currentPage;

	const dotNextPage = pageCount - currentPage > pageButtonSize;
	const dotPrevPage = currentPage - 1 > pageButtonSize;

	if (!total || total < 1 || pageCount <= 1) return null;
	if (!pageIndex && !itemIndex) return null;

	const changeHandler = (index) => {
		if (onChange) onChange(index);
	};

	const CN = {
		el: `${elClass} ${borderColor} ${bgColor} min-h-[70px] flex items-center justify-center gap-[2px] rounded border-t text-[12px] px-4`,
		button: `${buttonClass} ${borderColor} flex items-center justify-center py-1 px-2 min-w-[40px] min-h-[40px] rounded-full hover:font-bold hover:scale-[102%]`,
		currentButton: `${currentButtonBgColor || buttonBgColor}  ${currentTextColor || buttonTextColor}`,
		jumpButton: `${jumpButtonBgColor || buttonBgColor} ${jumpButtonTextColor || buttonTextColor} flex items-center justify-center gap-2 border border-text-tertiary-30 !rounded-[16px] px-3`,
		deactiveButton: `${buttonBgColor} ${buttonTextColor}`,
	};

	return (
		<Block
			boxProps={{
				...boxProps,
				className: `${boxProps?.className || ''}`,
			}}
		>
			<div className={CN.el}>
				<>
					<button
						className={`${CN.button} ml-auto ${CN.jumpButton} ${currentPage > 1 ? '' : 'pointer-events-none bg-background-secondary text-text-tertiary-50'}`}
						onClick={() => changeHandler(pageIndex ? currentPage - 1 : itemIndex - pageSize)}
					>
						<i className='fa fa-long-arrow-right' />
						<span>قبلی</span>
					</button>
					<button
						className={`${CN.button} mx-2 ${currentPage > 1 ? '' : 'pointer-events-none text-text-tertiary-50'}`}
						onClick={() => changeHandler(1)}
					>
						<span>اولین</span>
					</button>
				</>

				{dotPrevPage && (
					<button className={`${CN.button} mx-2 pointer-events-none`}>
						<span>...</span>
					</button>
				)}

				{new Array(prevPageCount).fill('').map((item, i) => (
					<button
						onClick={() =>
							changeHandler(
								pageIndex ? i + currentPage - prevPageCount : (i + currentPage - prevPageCount) * pageSize - pageSize + 1,
							)
						}
						key={i}
						className={`${CN.button} ${CN.deactiveButton}`}
					>
						{i + currentPage - prevPageCount}
					</button>
				))}

				<button className={`${CN.button} ${CN.currentButton}`}>{currentPage}</button>
				{new Array(nextPageCount).fill('').map((item, i) => (
					<button
						onClick={() => changeHandler(pageIndex ? currentPage + i + 1 : pageSize * (currentPage + i) + 1)}
						key={i}
						className={`${CN.button} ${CN.deactiveButton}`}
					>
						{currentPage + i + 1}
					</button>
				))}

				{dotNextPage && (
					<button className={`${CN.button} mx-2 pointer-events-none`}>
						<span>...</span>
					</button>
				)}

				<>
					<button
						className={`${CN.button} mx-2 ${currentPage < pageCount ? '' : 'pointer-events-none bg-background-secondary text-text-tertiary-50'}`}
						onClick={() => changeHandler(pageIndex ? pageCount : pageCount * pageSize - pageSize + 1)}
					>
						<span>آخرین</span>
					</button>
					<button
						className={`${CN.button} ${CN.jumpButton} mr-auto ${currentPage < pageCount ? '' : 'pointer-events-none text-text-tertiary-50'}`}
						onClick={() => changeHandler(pageIndex ? currentPage + 1 : itemIndex + pageSize)}
					>
						<span>بعدی</span>
						<i className='fa fa-long-arrow-left' />
					</button>
				</>
			</div>
		</Block>
	);
};

export default PrimaryPagination;
