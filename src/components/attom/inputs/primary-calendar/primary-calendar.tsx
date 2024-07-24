import { useMemo, useState } from 'react';

import moment from 'jalali-moment';

import { Block, PrimarySelect } from '@attom';

export type PrimaryCalendarProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	//
	value?: string | null;
	nowDate?: string | null;
	onChange?: null | ((iso: string, jalaali: string) => any);
	markDays?: string[];
	geoCalendar?: boolean;
};

export const monthProtoType = {
	1: 'فروردین',
	2: 'اردیبهشت',
	3: 'خرداد',
	4: 'تیر',
	5: 'مرداد',
	6: 'شهریور',
	7: 'مهر',
	8: 'آبان',
	9: 'آذر',
	10: 'دی',
	11: 'بهمن',
	12: 'اسفند',
};

export const PrimaryCalendar: React.FC<PrimaryCalendarProps> = ({
	boxProps,
	//
	nowDate = '',
	value = '',
	onChange = null,
	markDays = [],
	geoCalendar = false,
}) => {
	const valueISO = value && Date.parse(value) ? new Date(value).toISOString() : '';
	const valueJalaali = valueISO ? moment(valueISO).locale('fa').format('YYYY/MM/DD') : '';

	const todayISO = new Date(nowDate && Date.parse(nowDate) ? nowDate : Date.now()).toISOString();
	const todayJalaali = moment(todayISO).locale('fa').format('YYYY/MM/DD');

	const findFirstDayDate = () => {
		const pickedDate = new Date((Date.parse(value || '') && value) || (Date.parse(nowDate || '') && nowDate) || Date.now());
		const jalaaliPickDate = moment(pickedDate).locale('fa').format('YYYY/MM/DD');

		const [year, month] = [jalaaliPickDate.slice(0, 4), jalaaliPickDate.slice(5, 7)];

		return { year: +year, month: +month };
	};

	const [yearMonth, setYearMonth] = useState(() => findFirstDayDate());

	const changeSectionTime = (status: 'nextMonth' | 'nextYear' | 'prevMonth' | 'prevYear') => {
		let monthUpdate = yearMonth.month;
		let yearUpdate = yearMonth.year;

		if (status === 'nextMonth') {
			if (yearMonth.month >= 12) {
				monthUpdate = 1;
				yearUpdate = yearMonth.year + 1;
			} else {
				monthUpdate = yearMonth.month + 1;
				yearUpdate = yearMonth.year;
			}
		}

		if (status === 'nextYear') {
			monthUpdate = yearMonth.month;
			yearUpdate = yearMonth.year + 1;
		}

		if (status === 'prevMonth') {
			if (yearMonth.month <= 1) {
				monthUpdate = 12;
				yearUpdate = yearMonth.year - 1;
			} else {
				monthUpdate = yearMonth.month - 1;
				yearUpdate = yearMonth.year;
			}
		}

		if (status === 'prevYear') {
			monthUpdate = yearMonth.month;
			yearUpdate = yearMonth.year - 1;
		}

		setYearMonth((PS) => ({ ...PS, year: yearUpdate, month: monthUpdate }));
	};

	const changeHandler = (geoDate) => {
		const ts = Date.parse(geoDate);
		const result = ts ? new Date(ts).toISOString() : '';
		const jalaaliResult = ts ? moment(result).locale('fa').format('YYYY/MM/DD') : '';

		if (onChange) onChange(result, jalaaliResult);
	};

	const markDaysObj = useMemo(() => {
		return markDays.reduce((result, current) => {
			const date = current && Date.parse(current) ? new Date(current) : '';
			if (!date) return result;

			const iso = date.toISOString().slice(0, 10);
			const jalaali = moment(iso).locale('fa').format('YYYY/MM/DD');

			result[jalaali] = jalaali;

			return result;
		}, {});
	}, [markDays]);

	return (
		<Block boxProps={boxProps}>
			<div className='max-w-[400px] min-h-[400px] mx-auto p-2 select-none'>
				{/* Year Select */}
				<div className='flex items-center justify-between pt-[10px] gap-2'>
					<PrimarySelect
						boxProps={{ className: 'min-h-[30px] py-2 px-3' }}
						options={new Array(111)
							.fill(+(todayJalaali || '1403').slice(0, 4) - 100)
							.map((item, i) => ({ value: item + i, name: item + i }))}
						value={yearMonth.year}
						onChange={(item) => setYearMonth((PS) => ({ ...PS, year: item?.value || yearMonth.year }))}
					/>
					<span
						className='text-[12px] font-[500] flex items-center gap-1 text-primary-1 cursor-pointer brightness-125'
						onClick={() => changeHandler(todayISO)}
					>
						<span>برو به امروز</span>
						<i className='icon-back text-[14px]' />
					</span>
				</div>
				{/* Month Select */}
				<div className='flex items-center justify-between pt-[20px] gap-2'>
					<i
						className='fa fa-angle-right !text-[32px] text-primary-1 cursor-pointer'
						onClick={() => changeSectionTime('prevMonth')}
					/>
					<span>{monthProtoType[yearMonth?.month || ''] || ''} ماه</span>
					<i
						className='fa fa-angle-left !text-[32px] text-primary-1 cursor-pointer'
						onClick={() => changeSectionTime('nextMonth')}
					/>
				</div>
				{/* Header */}
				<div className='grid grid-cols-7 gap-1 text-[12px] pt-[20px] pb-[20px]'>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>ش</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>ی</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>د</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>س</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>چ</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-[#949494]'>پ</span>
					</span>
					<span className='col-span-1 flex items-center justify-center'>
						<span className='h-[35px] w-[35px] text-center rounded-full flex items-center justify-center text-danger-80'>ج</span>
					</span>
				</div>
				{/* Body */}
				<div className='min-h-[250px]'>
					<div className='grid grid-cols-7 gap-1 text-[12px] py-2 border-t border-[#fff4]'>
						{new Array(31).fill({}).map((item, i) => {
							const currentGeo = moment.from(`${yearMonth.year}/${yearMonth.month}/${i + 1}`, 'fa', 'YYYY/MM/DD');
							const currentJalaali = moment(currentGeo).locale('fa').format('YYYY/MM/DD');
							const currentISO = currentGeo.toISOString();

							const [year, month, day] = [+currentJalaali.slice(0, 4), +currentJalaali.slice(5, 7), +currentJalaali.slice(8, 10)];

							if (month !== yearMonth.month) return;

							const weekDayNo = currentGeo.jDay() + 1;
							const spanGapCount = i === 0 ? weekDayNo - 1 : 0;

							const isActive = currentJalaali === valueJalaali;
							const isToday = todayJalaali === currentJalaali;
							const isMark = markDaysObj?.[currentJalaali] || '';

							const bgClass = (isActive && 'bg-primary-1') || 'hover:bg-background-tertiary';
							const borderClass = (!isActive && isToday && 'border border-primary-1') || 'border border-transparent';
							const colorClass = (weekDayNo === 7 && 'text-danger-80') || '';

							return (
								<span className='contents' key={i}>
									{i === 0 &&
										spanGapCount > 0 &&
										new Array(spanGapCount).fill({}).map((item, i2) => (
											<span className='col-span-1 flex items-center justify-center' key={i2}>
												<span className='w-[35px] h-[35px] flex items-center justify-center text-center rounded-full opacity-20'>
													-
												</span>
											</span>
										))}
									<span className='col-span-1 flex items-center justify-center'>
										<span
											className={`relative w-[35px] h-[35px] flex items-center justify-center text-center rounded-full cursor-pointer ${bgClass} ${borderClass} ${colorClass}`}
											onClick={() => changeHandler(currentISO)}
										>
											{+day}

											{isMark && (
												<span className='absolute bg-success h-[8px] w-[8px] rounded-full top-0 right-0 animate-pulse'></span>
											)}
										</span>
									</span>
								</span>
							);
						})}
					</div>
				</div>
				{value && (
					<div className='h-[30px] text-danger text-[13px] flex items-center justify-end'>
						<span className='cursor-pointer' onClick={() => changeHandler('')}>
							پاک کردن
						</span>
					</div>
				)}
			</div>
		</Block>
	);
};
