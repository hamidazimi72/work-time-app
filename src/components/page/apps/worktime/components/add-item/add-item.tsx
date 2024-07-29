import { PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimaryModal } from '@attom';
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
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={arrivalTime}
							onChange={(e) => overWrite({ value: { arrivalTime: e }, scope: 'addItem.form' })}
							disabled={isVacation}
							timePicker
						/>
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={departureTime}
							onChange={(e) => overWrite({ value: { departureTime: e }, scope: 'addItem.form' })}
							disabled={isVacation}
							timePicker
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
