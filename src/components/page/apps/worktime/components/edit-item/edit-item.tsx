import { PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimaryModal, PureForm } from '@attom';
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
	const { arrivalDate, departureDate, isVacation } = form;

	const actions = page_worktime.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.editItem }, scope: 'editItem' });
	};

	const editTimeHandler = (closeHanlder: () => void) => {
		if (isVacation && !arrivalDate) {
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
				arrivalDate: selectedItem?.arrivalDate,
				departureDate: selectedItem?.departureDate,
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
				<div className='flex flex-col gap-8'>
					<h3>ویرایش ساعت کاری</h3>
					<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={arrivalDate}
							onChange={(e) =>
								overWrite({
									value: { arrivalDate: new Date(new Date(e).setSeconds(0, 0)).toISOString() },
									scope: 'editItem.form',
								})
							}
							disabled={isVacation}
							timePicker
						/>
						<PrimaryDatePicker
							format='YYYY/MM/DD - HH:mm'
							value={departureDate}
							onChange={(e) =>
								overWrite({
									value: { departureDate: new Date(new Date(e).setSeconds(0, 0)).toISOString() },
									scope: 'editItem.form',
								})
							}
							disabled={isVacation}
							timePicker
						/>
						{arrivalDate && (
							<PrimaryCheckbox
								label='مرخصی'
								value={isVacation}
								onChange={(value) => overWrite({ value: { isVacation: value }, scope: 'editItem.form' })}
							/>
						)}

						<PrimaryButton content='ویرایش' onClick={() => editTimeHandler(closeHanlder)} />
					</PureForm>
				</div>
			)}
		/>
	);
};

export default EditItem;
