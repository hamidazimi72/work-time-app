import { PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimaryModal } from '@attom';
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
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={arrivalTime}
							onChange={(e) => overWrite({ value: { arrivalTime: e }, scope: 'editItem.form' })}
							disabled={isVacation}
							timePicker
						/>
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={departureTime}
							onChange={(e) => overWrite({ value: { departureTime: e }, scope: 'editItem.form' })}
							disabled={isVacation}
							timePicker
						/>
						{arrivalTime && (
							<PrimaryCheckbox
								label='مرخصی'
								value={isVacation}
								onChange={(value) => overWrite({ value: { isVacation: value }, scope: 'editItem.form' })}
							/>
						)}

						<PrimaryButton content='ثبت' onClick={() => editTimeHandler(closeHanlder)} />
					</div>
				</div>
			)}
		/>
	);
};

export default EditItem;
