import { useRef, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import Toolbar from 'react-multi-date-picker/plugins/toolbar';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import 'react-multi-date-picker/styles/layouts/mobile.css';

import { Block } from '@attom';
import { useDidMount } from '@hooks';

export type PrimaryDatePickerProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	labelProps?: React.HTMLAttributes<HTMLDivElement>;
	//
	format?: string;
	value?: string | Date;
	label?: string;
	onChange?: null | ((value: string | number, event: any) => any);
	focus?: boolean;
	disabled?: boolean;
	mobileMode?: boolean;
	//
	timePicker?: boolean;
	hideSeconds?: boolean;
	toolbar?: boolean;
};

export const PrimaryDatePicker: React.FC<PrimaryDatePickerProps> = ({
	boxProps,
	labelProps,

	format = 'YYYY/MM/DD',
	value = '',
	label = '',

	onChange = null,
	focus = false,
	disabled = false,
	mobileMode = true,

	timePicker = false,
	hideSeconds = true,
	toolbar = false,
}) => {
	//
	const [plugins, setPlugins] = useState<any[]>([]);

	const rf: any = useRef();

	useDidMount(() => {
		if (focus) {
			rf.current.focus();
		}
	}, []);

	const onChangeHandler = (e: DateObject) => {
		// console.log(new Date(e?.toUnix() * 1000).toISOString());
		// if (onChange) onChange(e?.toUnix() * 1000 || '', e);
		if (onChange) onChange(new Date(e?.toUnix() * 1000).toISOString() || '', e);
	};

	useDidMount(() => {
		if (timePicker) setPlugins([...plugins, <TimePicker position='bottom' hideSeconds={hideSeconds} />]);
		if (toolbar)
			setPlugins([
				...plugins,
				<Toolbar
					position='bottom'
					names={{
						today: 'گرفتن امروز',
						deselect: 'حذف',
						close: 'بسته شدن',
					}}
				/>,
			]);
	});

	return (
		<Block boxProps={boxProps}>
			{label ? (
				<div {...labelProps} className={`${labelProps?.className || ''} text-sm mb-1`}>
					{label || ''}
				</div>
			) : null}
			<DatePicker
				inputClass='w-full bg-background-primary disabled:bg-background-tertiary text-text-secondary placeholder:placeholder-cancel border border-text-tertiary-30 rounded-lg p-2 min-h-[48px]'
				containerClassName='!block'
				className={`${mobileMode ? `rmdp-mobile` : ``}`}
				format={format}
				ref={rf}
				calendar={persian}
				locale={persian_fa}
				value={value}
				onChange={(e: DateObject) => onChangeHandler(e)}
				disabled={disabled}
				plugins={plugins}
				calendarPosition='bottom-right'
			>
				<input className='' />
			</DatePicker>
		</Block>
	);
};

export default PrimaryDatePicker;
