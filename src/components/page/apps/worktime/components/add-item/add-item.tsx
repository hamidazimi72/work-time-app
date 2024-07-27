import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import { PrimaryButton, PrimaryCheckbox, PrimaryModal } from '@attom';
import { page_worktime } from '@context';
import { useToast } from '@hooks';

export type AddItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AddItem: React.FC<AddItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_worktime.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { arrivalTime, departureTime, isVacation } = form;

	const actions = page_worktime.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.addItem }, scope: 'addItem' });
	};

	const onChangeHandler1 = (e: DateObject) => {
		const obj = {
			timestamp: e.toUnix() * 1000,
			year: e?.year,
			month: { ...e?.month },
			day: e?.day,
			hour: e?.hour,
			minute: e?.minute,
		};
		// console.log(e);
		overWrite({ value: { arrivalTime: e?.toUnix() * 1000 }, scope: 'addItem.form' });
	};

	const onChangeHandler2 = (e: DateObject) => {
		overWrite({ value: { departureTime: e?.toUnix() * 1000 }, scope: 'addItem.form' });
	};

	const addTimeHandler = (closeHanlder: () => void) => {
		if (isVacation && !arrivalTime) {
			showToast({ message: 'لطفا تاریخ را وارد کنید!', showIcon: true, type: 'warning' });
			return;
		}

		actions.addItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'روز کاری با موفقیت ثبت گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	return (
		<PrimaryModal
			boxProps={boxProps}
			onClose={onClose}
			render={(closeHanlder) => (
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<DatePicker
							format='YYYY/MM/DD - HH:mm'
							calendar={persian}
							locale={persian_fa}
							calendarPosition='bottom-right'
							value={arrivalTime}
							onChange={(e: DateObject) => onChangeHandler1(e)}
							disabled={isVacation}
							plugins={[<TimePicker position='bottom' hideSeconds />]}
						/>
						<DatePicker
							format='YYYY/MM/DD - HH:mm'
							calendar={persian}
							locale={persian_fa}
							calendarPosition='bottom-right'
							value={departureTime}
							onChange={(e: DateObject) => onChangeHandler2(e)}
							disabled={isVacation}
							plugins={[<TimePicker position='bottom' hideSeconds />]}
						/>

						{arrivalTime && (
							<PrimaryCheckbox
								label='مرخصی'
								value={isVacation}
								onChange={(value) => overWrite({ value: { isVacation: value }, scope: 'addItem.form' })}
							/>
						)}

						<PrimaryButton content='ثبت' onClick={() => addTimeHandler(closeHanlder)} />
					</div>
				</div>
			)}
		/>
	);
};

export default AddItem;
