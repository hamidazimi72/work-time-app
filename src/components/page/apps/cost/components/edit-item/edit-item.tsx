import { PrimaryButton, PrimaryDatePicker, PrimaryInput, PrimaryModal, PureForm } from '@attom';
import { page_cost } from '@context';
import { useDidMount, useToast } from '@hooks';

export type EditItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const EditItem: React.FC<EditItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_cost.useContext();
	const { editItem } = state;
	const { form, selectedItem } = editItem;
	const { category, date, description, price } = form;

	const actions = page_cost.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.editItem }, scope: 'editItem' });
	};

	const addTimeHandler = (closeHanlder: () => void) => {
		// if (isVacation && !arrivalTime) {
		// 	showToast({ message: 'لطفا تاریخ را وارد کنید!', showIcon: true, type: 'warning' });
		// 	return;
		// }

		actions.editItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'هزینه با موفقیت ویرایش گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	useDidMount(() => {
		if (!selectedItem) return;

		overWrite({
			value: {
				id: selectedItem?.id,
				category: selectedItem?.category,
				date: selectedItem?.date,
				description: selectedItem?.description,
				price: selectedItem?.price,
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
					<h3>ویرایش هزینه</h3>
					<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
						<PrimaryInput
							label='عنوان'
							value={category}
							onChange={(e) => overWrite({ value: { category: e }, scope: 'editItem.form' })}
							// focus
						/>
						<PrimaryInput
							label='مبلغ'
							placeholder='مبلغ (تومان)'
							value={price}
							onChange={(e) => {
								overWrite({ value: { price: e }, scope: 'editItem.form' });
							}}
							priceMode
						/>
						<PrimaryDatePicker
							label='تاریخ'
							value={date}
							onChange={(e) => overWrite({ value: { date: e }, scope: 'editItem.form' })}
						/>
						<PrimaryInput
							label='توضیحات'
							value={description}
							onChange={(e) => {
								overWrite({ value: { description: e }, scope: 'editItem.form' });
							}}
						/>
						<PrimaryButton content='ویرایش' onClick={() => addTimeHandler(closeHanlder)} />
					</PureForm>
				</div>
			)}
		/>
	);
};

export default EditItem;
