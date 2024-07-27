import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import { PrimaryButton, PrimaryCheckbox, PrimaryModal } from '@attom';
import { page_worktime } from '@context';
import { useDidMount, useToast } from '@hooks';

export type EditItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const EditItem: React.FC<EditItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_worktime.useContext();
	const { editItem } = state;
	const { form, selectedItem } = editItem;
	const { arrivalTime, departureTime, isVacation } = form;

	const actions = page_worktime.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.editItem }, scope: 'editItem' });
	};

	const onChangeHandler1 = (e: DateObject) => {
		overWrite({ value: { arrivalTime: e?.toUnix() * 1000 }, scope: 'editItem.form' });
	};

	const onChangeHandler2 = (e: DateObject) => {
		overWrite({ value: { departureTime: e?.toUnix() * 1000 }, scope: 'editItem.form' });
	};

	const editTimeHandler = (closeHanlder: () => void) => {
		if (isVacation && !arrivalTime) {
			showToast({ message: 'لطفا تاریخ را وارد کنید!', showIcon: true, type: 'warning' });
			return;
		}

		actions.editItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'روز کاری با موفقیت ویرایش گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	useDidMount(() => {
		if (!selectedItem) return;

		overWrite({
			value: {
				id: selectedItem?.id,
				arrivalTime: selectedItem?.arrivalTime,
				departureTime: selectedItem?.departureTime,
				isVacation: selectedItem?.isVacation,
			},
			scope: 'editItem.form',
		});
	}, [selectedItem]);

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

						<PrimaryCheckbox
							label='مرخصی'
							value={isVacation}
							onChange={(value) => overWrite({ value: { isVacation: value }, scope: 'editItem.form' })}
						/>

						<PrimaryButton content='ثبت' onClick={() => editTimeHandler(closeHanlder)} />
					</div>
				</div>
			)}
		/>
	);
};

export default EditItem;
