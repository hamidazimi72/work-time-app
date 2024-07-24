import { useRef, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import Toolbar from 'react-multi-date-picker/plugins/toolbar';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import { Block } from '@attom';
import { useDidMount } from '@hooks';

export type PrimaryDatePickerProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	labelProps?: React.HTMLAttributes<HTMLDivElement>;
	//
	format?: string;
	value?: number | Date;
	label?: string;
	onChange?: null | ((value: string | number, event: any) => any);
	focus?: boolean;
	disabled?: boolean;
	//
	timePicker?: boolean;
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

	timePicker = false,
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
		if (onChange) onChange(e?.toUnix() * 1000 || '', e);
	};

	useDidMount(() => {
		if (timePicker) setPlugins([...plugins, <TimePicker position='bottom' />]);
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
				<div {...labelProps} className={`${labelProps?.className || ''} text-[13px] min-h-[30px] font-[500]`}>
					{label || ''}
				</div>
			) : null}
			<DatePicker
				format={format}
				ref={rf}
				calendar={persian}
				locale={persian_fa}
				value={value}
				onChange={(e: DateObject) => onChangeHandler(e)}
				disabled={disabled}
				plugins={plugins}
				calendarPosition='bottom-right'
			/>
		</Block>
	);
};

export default PrimaryDatePicker;
