import { PrimaryButton, PrimaryDatePicker, PrimaryInput, PrimaryModal, PureForm } from '@attom';
import { page_cost } from '@context';
import { useToast } from '@hooks';

export type AddItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AddItem: React.FC<AddItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_cost.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { category, date, description, price } = form;

	const actions = page_cost.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.addItem }, scope: 'addItem' });
	};

	const addCostHandler = (closeHanlder: () => void) => {
		// if (isVacation && !arrivalTime) {
		// 	showToast({ message: 'لطفا تاریخ را وارد کنید!', showIcon: true, type: 'warning' });
		// 	return;
		// }

		actions.addItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'هزینه جدید با موفقیت ثبت گردید!', showIcon: true, type: 'success' });
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
						<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
							<PrimaryInput
								label='عنوان'
								value={category}
								onChange={(e) => overWrite({ value: { category: e }, scope: 'addItem.form' })}
							/>
							<PrimaryInput
								label='مبلغ'
								placeholder='مبلغ (تومان)'
								value={price}
								onChange={(e) => {
									overWrite({ value: { price: e }, scope: 'addItem.form' });
								}}
								priceMode
							/>

							<PrimaryDatePicker value={date} onChange={(e) => overWrite({ value: { date: e }, scope: 'addItem.form' })} />
							<PrimaryInput
								label='توضیحات'
								value={description}
								onChange={(e) => {
									overWrite({ value: { description: e }, scope: 'addItem.form' });
								}}
							/>
							<PrimaryButton content='ثبت' onClick={() => addCostHandler(closeHanlder)} />
						</PureForm>
					</div>
				</div>
			)}
		/>
	);
};

export default AddItem;
