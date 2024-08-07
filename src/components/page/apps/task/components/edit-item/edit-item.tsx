import { PrimaryButton, PrimaryDatePicker, PrimaryInput, PrimaryModal, PureForm } from '@attom';
import { page_task } from '@context';
import { useDidMount, useToast } from '@hooks';

export type EditItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const EditItem: React.FC<EditItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_task.useContext();
	const { editItem } = state;
	const { form, selectedItem } = editItem;
	const { title, date } = form;

	const actions = page_task.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.editItem }, scope: 'editItem' });
	};

	const editTaskHandler = (item: API_task_item | null, closeHanlder: () => void) => {
		actions.editItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'وظیفه با موفقیت ویرایش گردید!', showIcon: true, type: 'success' });
			},
			item: { id: item?.id || 0, title: title, date: date || '', isComplete: item?.isComplete || false, user: item?.user || '' },
		});
	};

	useDidMount(() => {
		if (!selectedItem) return;

		overWrite({
			value: {
				id: selectedItem?.id,
				date: selectedItem?.date,
				title: selectedItem?.title,
				isComplete: selectedItem?.date,
			},
			scope: 'editItem.form',
		});
	}, [selectedItem]);

	return (
		<PrimaryModal
			boxProps={{ ...boxProps, className: `p-4 ${boxProps?.className || ''}` }}
			onClose={onClose}
			render={(closeHanlder) => (
				<div className='flex flex-col gap-8'>
					<h3>ویرایش وظیفه</h3>
					<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
						<PrimaryInput
							label='عنوان'
							value={title}
							onChange={(e) => overWrite({ value: { title: e }, scope: 'editItem.form' })}
							// focus
						/>
						<PrimaryDatePicker
							label='تاریخ'
							value={date}
							onChange={(e) => overWrite({ value: { date: e }, scope: 'editItem.form' })}
						/>
						<PrimaryButton content='ویرایش' onClick={() => editTaskHandler(selectedItem, closeHanlder)} />
					</PureForm>
				</div>
			)}
		/>
	);
};

export default EditItem;
