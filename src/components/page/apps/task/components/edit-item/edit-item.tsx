import { PrimaryButton, PrimaryInput, PrimaryModal, PureForm } from '@attom';
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
	const { title } = form;

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
			item: { id: item?.id || 0, title: title, isComplete: item?.isComplete || false, user: item?.user || '' },
		});
	};

	useDidMount(() => {
		if (!selectedItem) return;

		overWrite({
			value: {
				id: selectedItem?.id,
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
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<PureForm boxProps={{ className: 'flex flex-col gap-4' }}>
							<PrimaryInput
								label='عنوان'
								value={title}
								onChange={(e) => overWrite({ value: { title: e }, scope: 'editItem.form' })}
								focus
							/>
							<PrimaryButton content='ثبت' onClick={() => editTaskHandler(selectedItem, closeHanlder)} />
						</PureForm>
					</div>
				</div>
			)}
		/>
	);
};

export default EditItem;
