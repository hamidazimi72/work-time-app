import { useRef, useState } from 'react';

import { Block, SVGIcon, SVGIcons, SVGIcons_icons } from '@attom';
import { useDidMount } from '@hooks';

type Option = any | { name?: string; value?: any; icon?: any; [key: string]: any };

export type PrimarySelectProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	labelProps?: React.HTMLAttributes<HTMLDivElement>;
	elProps?: React.HTMLAttributes<HTMLDivElement>;

	optionsClass?: string;
	optionsSpace?: string;
	optionClass?: string;
	optionSpace?: string;
	placeholderClass?: string;
	borderColor?: string;
	focusBorderColor?: string;
	fillBorderColor?: string;
	disableBorderColor?: string;
	optionBorderColor?: string;

	bgColor?: string;
	disableBgColor?: string;
	textColor?: string;
	disableTextColor?: string;
	placeholderTextColor?: string;

	value?: number | string | (number | string)[] | null;
	item?: Option | null;
	options?: Option[];
	label?: string;
	placeholder?: string;
	onChange?: null | ((item: Option | null) => any);
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	emptyOption?: boolean | string;
	noOptionLabel?: string;
	dataTable?: boolean;

	//
	prefix?: string | (() => any);
	prefixIcon?: boolean | SVGIcons;
	suffix?: string | (() => any);
	suffixIcon?: boolean | SVGIcons;

	isValid?: boolean | null;
	validationMessage?: string | false;
	message?: string | null | JSX.Element;

	namesSeperator?: string;
	valueProperty?: string;
	nameProperty?: string | string[];
	iconProperty?: string;
};

export const PrimarySelect: React.FC<PrimarySelectProps> = ({
	// box Control
	boxProps,
	labelProps,
	elProps,

	optionsClass = '',
	optionsSpace = 'p-3',
	optionClass = '',
	optionSpace = 'p-3 min-h-[35px]',
	placeholderClass = '',
	// Bg Color
	bgColor = 'bg-background-primary',
	disableBgColor = 'bg-background-tertiary',
	textColor = 'text-text-secondary',
	// Text Color
	disableTextColor = 'text-text-secondary',
	placeholderTextColor = 'text-cancel',
	// Border Color
	borderColor = 'border-text-tertiary-30',
	focusBorderColor = 'border-text-tertiary-30',
	fillBorderColor = 'border-text-tertiary-30',
	disableBorderColor = 'border-text-tertiary-30',
	optionBorderColor = 'border-text-tertiary-30',
	label = '',
	placeholder = '',
	options = [],
	value = null,
	item = null,
	onChange = null,
	disabled = false,
	required = false,
	readOnly = false,
	emptyOption = false,
	noOptionLabel = 'موردی یافت نشد',
	dataTable = false,
	//
	prefix,
	prefixIcon,
	suffix,
	suffixIcon,
	//
	// Validation
	isValid = null,
	validationMessage = undefined,
	message,
	// property Name
	namesSeperator = ' ',
	valueProperty = 'value',
	nameProperty = 'name', // string || array of string
	iconProperty = 'icon',
}) => {
	// variables and functions:
	const [isShow, setShow] = useState<boolean>(false);
	const [selected, setSelected] = useState<Option | null>(null);
	const [searched, setSearched] = useState<string>('');

	const ref: any = useRef();

	const filteredOptions =
		dataTable && searched
			? options.filter((item) => {
					let name = '';
					if (typeof nameProperty === 'string') name = item[nameProperty];
					if (typeof nameProperty === 'object')
						name = nameProperty.reduce((result, currentName, index) => {
							return result + (item[currentName] || '') + (index + 1 < nameProperty.length ? namesSeperator : ' ');
						}, '');

					return (name || '').includes(searched);
				})
			: options;

	const generateFullname = (item: Option | null) => {
		if (!item) return '';
		else if (typeof nameProperty === 'string') return item[nameProperty] ?? '';
		else if (typeof nameProperty === 'object' && nameProperty.length > 0)
			return nameProperty.reduce((result, currentName) => {
				return result + (item[currentName] || '') + ' ';
			}, '');
		else return '';
	};

	const selectItem = (item) => {
		if (disabled || readOnly) return;
		if (onChange && !disabled) onChange(item);
	};

	const clickHandle = (e) => {
		if (isShow && dataTable && e.target?.id === 'search-datatable') return;
		else if (ref.current && !ref.current.contains(e.target)) setShow(false);
	};

	const clickOnElementHandle = (e) => {
		if (disabled && !isShow) return;
		if (isShow && dataTable && e.target?.id === 'search-datatable') return;
		else setShow(!isShow);
	};

	useDidMount(() => {
		setSelected(
			options.find((selectedItem) => {
				if (item) return selectedItem[valueProperty] === item[valueProperty];
				else if (value) return selectedItem[valueProperty] === value;
				else return null;
			}) || null,
		);
	}, [value, item, options]);

	useDidMount(() => {
		document.addEventListener('click', clickHandle);

		return () => document.removeEventListener('click', clickHandle);
	}, []);

	const bgColorClass = (disabled && disableBgColor) || bgColor || '';
	const textColorClass = (disabled && disableTextColor) || textColor || '';

	const isSuccess = isValid === true;
	const isDanger = isValid === false;

	const borderColorClass =
		(disabled && disableBorderColor) ||
		(isSuccess && 'border-success') ||
		(isDanger && 'border-danger') ||
		(isShow && focusBorderColor) ||
		(selected && fillBorderColor) ||
		borderColor ||
		'';

	const CN = {
		el: `${bgColorClass} ${textColorClass} ${borderColorClass} ${
			disabled || readOnly ? 'pointer-events-none' : 'cursor-pointer'
		} relative w-full rounded-[12px] text-[13px] flex items-center border select-none whitespace-nowrap`,
		placeholder: `${placeholderClass} ${placeholderTextColor} text-[14px] font-[300]`,
		selectedLi: `flex items-center gap-2 w-full min-h-[50px] grow p-3 relative min-w-[100px]`,
		required: 'absolute top-1 left-1 text-[#822] text-[16px]',
		elIcon: `fa !text-[22px] fa-angle-${isShow ? 'up' : 'down'} absolute left-2 transition-all text-text-tertiary-50`,
		//
		ul: `${optionsClass} ${optionsSpace} ${bgColorClass} ${borderColorClass} ${textColorClass} ${
			isShow ? '' : 'hidden'
		} absolute rounded-[12px] w-full left-0 top-[100%] border select-none overflow-y-auto max-h-[200px] min-h-[30px] z-[3] text-md`,
		li: `${optionBorderColor} ${optionClass} ${optionSpace} whitespace-pre-wrap w-full flex items-center gap-2 border-b opacity-80 transition-all last:border-none hover:opacity-100`,
		searchLi: 'block outline-none bg-inherit text-inherit border-dashed',
		emptyLi: 'opacity-50 border-dashed',
		notOptionLabel: `${optionSpace} opacity-50 flex w-full items-center`,
	};

	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} relative` }}>
			<div {...labelProps} className={`${labelProps?.className || ''} text-[13px] min-h-[30px] font-[500]`}>
				{label || ''}
			</div>

			<div {...elProps} className={`${elProps?.className || ''} ${CN.el}`} onClick={clickOnElementHandle} ref={ref}>
				{(prefix || typeof prefixIcon === 'string') && (
					<span
						className={`min-w-[40px] min-h-[30px] text-text-tertiary-80 text-[13px] ${typeof prefix === 'string' && !prefixIcon ? '' : 'border-l border-text-tertiary-30'} h-[full] flex items-center justify-center`}
					>
						{!prefixIcon && typeof prefix === 'string' && prefix}
						{!prefixIcon && typeof prefix === 'function' && prefix()}
						{prefixIcon === true && typeof prefix === 'string' && <i className={`${prefix}`} />}
						{typeof prefixIcon === 'string' && SVGIcons_icons[prefixIcon] && (
							<SVGIcon icon={prefixIcon as any} width='w-[25px]' />
						)}
					</span>
				)}

				<div className={CN.selectedLi}>
					{selected && selected[iconProperty] && <img src={selected && selected[iconProperty].src} alt='icon' />}
					{selected && <span className='overflow-hidden'>{generateFullname(selected)}</span>}
					{!selected && <span className={placeholder ? `${CN.placeholder}` : 'opacity-0'}>{placeholder || '-'}</span>}

					<i className={CN.elIcon} />
				</div>

				{(suffix || typeof suffixIcon === 'string') && (
					<span
						className={`min-w-[40px] min-h-[30px] text-text-tertiary-80 text-[13px] ${typeof suffix === 'string' && !suffixIcon ? '' : ''} h-[full] flex items-center justify-center`}
					>
						{!suffixIcon && typeof suffix === 'string' && suffix}
						{!suffixIcon && typeof suffix === 'function' && suffix()}
						{suffixIcon === true && typeof suffix === 'string' && <i className={`${suffix}`} />}
						{typeof suffixIcon === 'string' && SVGIcons_icons[suffixIcon] && (
							<SVGIcon icon={suffixIcon as any} width='w-[25px]' />
						)}
					</span>
				)}

				{/*  */}
				<ul className={CN.ul}>
					{emptyOption && options.length > 0 && (item || value) && (
						<li className={CN.li + ' ' + CN.emptyLi} onClick={() => selectItem(null)}>
							{typeof emptyOption === 'string' ? (
								emptyOption
							) : (
								<>
									<i className='fa fa-close text-danger' />
									<span className='text-danger text-[12px]'>پاک کردن</span>
								</>
							)}
						</li>
					)}
					{dataTable && (
						<input
							id='search-datatable'
							className={CN.li + ' ' + CN.searchLi}
							type='text'
							value={searched}
							placeholder='جستجو'
							onChange={(e) => setSearched(e.target.value)}
							autoComplete='off'
						/>
					)}
					{noOptionLabel && filteredOptions.length === 0 && <div className={CN.notOptionLabel}>{noOptionLabel}</div>}
					{filteredOptions.map((item, i) => (
						<li className={CN.li} key={i} onClick={() => selectItem(item)}>
							{item && item[iconProperty] && <img src={item[iconProperty].src} alt='icon' />}
							<span>{generateFullname(item)}</span>
						</li>
					))}
				</ul>
			</div>

			{!message && !disabled && (isSuccess || isDanger || required) && (
				<div className='h-[25px] flex items-end text-[12px] pr-1'>
					{!isSuccess && !isDanger && required && !value && (
						<span className='text-text-tertiary-70'>پر کردن این فیلد اجباری است.</span>
					)}
					{isSuccess && validationMessage && <span className='text-success'>{validationMessage || ''}</span>}
					{isDanger && validationMessage && <span className='text-danger'>{validationMessage || ''}</span>}
				</div>
			)}

			{message && typeof message === 'string' && (
				<div className='h-[20px] flex items-end text-[12px] pr-1'>
					{<span className='text-text-tertiary-70'>{message || ''}</span>}
				</div>
			)}

			{message && typeof message !== 'string' && message}
		</Block>
	);
};

export default PrimarySelect;

// import { useRef, useState } from 'react';

// import { Block } from '@attom';
// import { useDidMount } from '@hooks';

// type Option = { name?: string; value?: any; icon?: any; [key: string]: any };

// export type PrimarySelectProps = {
// 	children?: any;
// 	boxProps?: React.HTMLAttributes<HTMLDivElement>;
// 	elProps?: React.HTMLAttributes<HTMLDivElement>;

// 	optionsClass?: string;
// 	optionsSpace?: string;
// 	optionClass?: string;
// 	optionSpace?: string;
// 	placeholderClass?: string;
// 	borderColor?: string;
// 	focusBorderColor?: string;
// 	fillBorderColor?: string;
// 	disableBorderColor?: string;
// 	optionBorderColor?: string;

// 	bgColor?: string;
// 	disableBgColor?: string;
// 	textColor?: string;
// 	disableTextColor?: string;
// 	placeholderTextColor?: string;

// 	value?: number | string | (number | string)[] | null;
// 	item?: Option | null;
// 	options?: Option[];
// 	label?: string;
// 	placeholder?: string;
// 	onChange?: null | ((item: Option | null) => any);
// 	disabled?: boolean;
// 	readOnly?: boolean;
// 	required?: boolean;
// 	emptyOption?: boolean | string;
// 	noOptionLabel?: string;
// 	dataTable?: boolean;
// 	isValid?: boolean | null;
// 	disableInvalidError?: boolean;
// 	disableValidError?: boolean;
// 	namesSeperator?: string;
// 	valueProperty?: string;
// 	nameProperty?: string | string[];
// 	iconProperty?: string;
// };

// export const PrimarySelect: React.FC<PrimarySelectProps> = ({
// 	// box Control
// 	boxProps,
// 	elProps,

// 	optionsClass = '',
// 	optionsSpace = 'py-[10px] px-3',
// 	optionClass = '',
// 	optionSpace = 'py-[10px] px-3',
// 	placeholderClass = '',
// 	// Bg Color
// 	bgColor = 'bg-[#fff]',
// 	disableBgColor = 'bg-[#fafafa]',
// 	textColor = 'text-[#111]',
// 	// Text Color
// 	disableTextColor = 'text-[#444]',
// 	placeholderTextColor = 'text-[#999]',
// 	// Border Color
// 	borderColor = 'border-[#99f]',
// 	focusBorderColor = 'border-[#55f]',
// 	fillBorderColor = 'border-[#77f]',
// 	disableBorderColor = 'border-[#555]',
// 	optionBorderColor = 'border-[#999]',
// 	label = '',
// 	placeholder = '',
// 	options = [],
// 	value = null,
// 	item = null,
// 	onChange = null,
// 	disabled = false,
// 	required = false,
// 	readOnly = false,
// 	emptyOption = false,
// 	noOptionLabel = 'موردی یافت نشد',
// 	dataTable = false,
// 	//
// 	isValid = null,
// 	disableInvalidError = false,
// 	disableValidError = false,
// 	// property Name
// 	namesSeperator = ' ',
// 	valueProperty = 'value',
// 	nameProperty = 'name', // string || array of string
// 	iconProperty = 'icon',
// }) => {
// 	// variables and functions:
// 	const [isShow, setShow] = useState<boolean>(false);
// 	const [selected, setSelected] = useState<Option | null>(null);
// 	const [searched, setSearched] = useState<string>('');

// 	const ref: any = useRef();

// 	const filteredOptions =
// 		dataTable && searched
// 			? options.filter((item) => {
// 					let name = '';
// 					if (typeof nameProperty === 'string') name = item[nameProperty];
// 					if (typeof nameProperty === 'object')
// 						name = nameProperty.reduce((result, currentName, index) => {
// 							return result + (item[currentName] || '') + (index + 1 < nameProperty.length ? namesSeperator : ' ');
// 						}, '');

// 					return name.includes(searched);
// 			  })
// 			: options;

// 	const generateFullname = (item: Option | null) => {
// 		if (!item) return '';
// 		else if (typeof nameProperty === 'string') return item[nameProperty] ?? '';
// 		else if (typeof nameProperty === 'object' && nameProperty.length > 0)
// 			return nameProperty.reduce((result, currentName) => {
// 				return result + (item[currentName] || '') + ' ';
// 			}, '');
// 		else return '';
// 	};

// 	const selectItem = (item) => {
// 		if (disabled || readOnly) return;
// 		if (onChange && !disabled) onChange(item);
// 	};

// 	const clickHandle = (e) => {
// 		if (isShow && dataTable && e.target?.id === 'search-datatable') return;
// 		else if (ref.current && !ref.current.contains(e.target)) setShow(false);
// 	};

// 	const clickOnElementHandle = (e) => {
// 		if (disabled && !isShow) return;
// 		if (isShow && dataTable && e.target?.id === 'search-datatable') return;
// 		else setShow(!isShow);
// 	};

// 	useDidMount(() => {
// 		setSelected(
// 			options.find((selectedItem) => {
// 				if (item) return selectedItem[valueProperty] === item[valueProperty];
// 				else if (value) return selectedItem[valueProperty] === value;
// 				else return null;
// 			}) || null,
// 		);
// 	}, [value, item, options]);

// 	useDidMount(() => {
// 		document.addEventListener('click', clickHandle);

// 		return () => document.removeEventListener('click', clickHandle);
// 	}, []);

// 	const bgColorClass = (disabled && disableBgColor) || bgColor || '';
// 	const textColorClass = (disabled && disableTextColor) || textColor || '';

// 	const isSuccess = isValid === true && (value || item) && !disableValidError;
// 	const isDanger = isValid === false && (value || item) && !disableInvalidError;

// 	const borderColorClass =
// 		(disabled && disableBorderColor) ||
// 		(isSuccess && 'border-success') ||
// 		(isDanger && 'border-danger') ||
// 		(isShow && focusBorderColor) ||
// 		(selected && fillBorderColor) ||
// 		borderColor ||
// 		'';

// 	const CN = {
// 		el: `${bgColorClass} ${textColorClass} ${borderColorClass} ${
// 			disabled || readOnly ? 'pointer-events-none' : 'cursor-pointer'
// 		} relative w-full h-full rounded  flex items-center border select-none whitespace-nowrap min-w-[200px]`,
// 		placeholder: `${placeholderClass} ${placeholderTextColor}`,
// 		selectedLi: `flex items-center gap-2 w-full h-full`,
// 		required: 'absolute top-1 left-1 text-[#822] text-[16px]',
// 		elIcon: `fa fa-angle-${isShow ? 'up' : 'down'} absolute left-2 transition-all`,
// 		//
// 		ul: `${optionsClass} ${optionsSpace} ${bgColorClass} ${borderColorClass} ${textColorClass} ${
// 			isShow ? '' : 'hidden'
// 		} absolute rounded w-full left-0 top-[100%] border select-none overflow-y-auto max-h-[280px] min-h-[30px] z-[3] text-md`,
// 		li: `${optionBorderColor} ${optionClass} ${optionSpace} w-full flex items-center gap-2 border-b opacity-80 transition-all last:border-none hover:opacity-100`,
// 		searchLi: 'block outline-none bg-inherit text-inherit border-dashed',
// 		emptyLi: 'opacity-50 border-dashed',
// 		notOptionLabel: `${optionSpace} opacity-50 flex w-full items-center`,
// 	};

// 	return (
// 		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} relative` }}>
// 			<div
// 				{...elProps}
// 				className={`${elProps?.className || ''} ${CN.el} px-3 py-[10px]`}
// 				onClick={clickOnElementHandle}
// 				ref={ref}
// 			>
// 				{!value && !item && <span className={CN.placeholder}>{label}</span>}
// 				<div className={CN.selectedLi}>
// 					{selected && selected[iconProperty] && <img src={selected && selected[iconProperty].src} alt='icon' />}
// 					{selected && <span>{generateFullname(selected)}</span>}
// 					{!selected && (
// 						<span className={placeholder ? `${CN.placeholder} text-[12px] py-1` : 'opacity-0'}>{placeholder || '-'}</span>
// 					)}{' '}
// 				</div>
// 				{required && <span className={CN.required}>*</span>}
// 				<i className={CN.elIcon} />
// 				<span
// 					className={`${
// 						selected ? '' : 'opacity-0'
// 					} transition-all duration-300 absolute inline-block top-[-14px] right-2 text-[16px] px-2 min-w-[50px] text-center`}
// 					style={{
// 						backgroundImage: `linear-gradient(
// 						to bottom,
// 						transparent calc(50% + 1px),
// 						${(bgColorClass || '').replace('bg-[', '').replace(']', '')} calc(50% + 1px),
// 						${(bgColorClass || '').replace('bg-[', '').replace(']', '')} calc(50% + 3px),
// 						transparent calc(50% + 4px)
// 					)`,
// 					}}
// 				>
// 					{label}
// 				</span>
// 				<ul className={CN.ul}>
// 					{emptyOption && options.length > 0 && (item || value) && (
// 						<li className={CN.li + ' ' + CN.emptyLi} onClick={() => selectItem(null)}>
// 							{typeof emptyOption === 'string' ? (
// 								emptyOption
// 							) : (
// 								<>
// 									<i className='fa fa-close text-danger' />
// 									<span className='text-danger text-sm'>پاک کردن</span>
// 								</>
// 							)}
// 						</li>
// 					)}
// 					{dataTable && (
// 						<input
// 							id='search-datatable'
// 							className={CN.li + ' ' + CN.searchLi}
// 							type='text'
// 							value={searched}
// 							placeholder='جستجو'
// 							onChange={(e) => setSearched(e.target.value)}
// 							autoComplete='off'
// 						/>
// 					)}
// 					{noOptionLabel && filteredOptions.length === 0 && <div className={CN.notOptionLabel}>{noOptionLabel}</div>}
// 					{filteredOptions.map((item, i) => (
// 						<li className={CN.li} key={i} onClick={() => selectItem(item)}>
// 							{item && item[iconProperty] && <img src={item[iconProperty].src} alt='icon' />}
// 							<span>{generateFullname(item)}</span>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</Block>
// 	);
// };

// export default PrimarySelect;
