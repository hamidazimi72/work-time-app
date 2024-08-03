import { PrimaryButton, PrimaryCheckbox, PrimaryDatePicker, PrimaryInput, PrimaryModal, PureForm } from '@attom';
import { page_task } from '@context';
import { useToast } from '@hooks';

export type AddItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AddItem: React.FC<AddItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_task.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { isComplete, title, date } = form;

	const actions = page_task.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.addItem }, scope: 'addItem' });
	};

	const addTaskHandler = (closeHanlder: () => void) => {
		actions.addItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'وظیفه جدید با موفقیت ثبت گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	return (
		<PrimaryModal
			boxProps={{ ...boxProps, className: `p-4 ${boxProps?.className || ''}` }}
			onClose={onClose}
			render={(closeHanlder) => (
				<div className='flex flex-col gap-8'>
					<h3>افزودن وظیفه</h3>
					<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
						<PrimaryInput
							label='عنوان'
							value={title}
							onChange={(e) => overWrite({ value: { title: e }, scope: 'addItem.form' })}
							// focus
						/>
						<PrimaryDatePicker
							label='تاریخ'
							value={date}
							onChange={(e) => overWrite({ value: { date: e }, scope: 'addItem.form' })}
						/>
						<PrimaryCheckbox
							label='انجام شده'
							value={isComplete}
							onChange={(value) => overWrite({ value: { isComplete: value }, scope: 'addItem.form' })}
						/>
						<PrimaryButton content='ثبت' onClick={() => addTaskHandler(closeHanlder)} />
					</PureForm>
				</div>
			)}
		/>
	);
};

export default AddItem;
