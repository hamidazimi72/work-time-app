import { PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimaryModal, PureForm } from '@attom';
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
	const { arrivalDate, departureDate, isVacation } = form;

	const actions = page_worktime.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.addItem }, scope: 'addItem' });
	};

	const addTimeHandler = (closeHanlder: () => void) => {
		if (isVacation && !arrivalDate) {
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
				<div className='flex flex-col gap-8'>
					<h3>افزودن ساعت کاری</h3>
					<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
						<PrimaryDatePicker
							label='زمان شروع'
							format='YYYY/MM/DD - HH:mm'
							value={arrivalDate}
							onChange={(e) =>
								overWrite({ value: { arrivalDate: new Date(new Date(e).setSeconds(0, 0)).toISOString() }, scope: 'addItem.form' })
							}
							disabled={isVacation}
							timePicker
						/>
						<PrimaryDatePicker
							label='زمان پایان'
							format='YYYY/MM/DD - HH:mm'
							value={departureDate}
							onChange={(e) =>
								overWrite({
									value: { departureDate: new Date(new Date(e).setSeconds(0, 0)).toISOString() },
									scope: 'addItem.form',
								})
							}
							disabled={isVacation}
							timePicker
						/>
						{arrivalDate ? (
							<PrimaryCheckbox
								label='مرخصی'
								value={isVacation}
								onChange={(value) => overWrite({ value: { isVacation: value }, scope: 'addItem.form' })}
							/>
						) : null}

						<PrimaryButton content='ثبت' onClick={() => addTimeHandler(closeHanlder)} />
					</PureForm>
				</div>
			)}
		/>
	);
};

export default AddItem;
