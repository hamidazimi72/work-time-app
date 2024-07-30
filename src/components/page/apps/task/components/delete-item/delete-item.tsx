import { PrimaryButton, PrimaryModal } from '@attom';
import { page_task } from '@context';
import { useToast } from '@hooks';
import { DateAPI } from '@utils';

export type DeleteItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const DeleteItem: React.FC<DeleteItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_task.useContext();
	const { deleteItem } = state;
	const { selectedItem } = deleteItem;

	const actions = page_task.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.deleteItem }, scope: 'deleteItem' });
	};

	const deleteTimeHandler = (closeHanlder: () => void) => {
		actions.deleteItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'وظیفه با موفقیت حذف گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	return (
		<PrimaryModal
			boxProps={{ ...boxProps, className: `p-4 ${boxProps?.className || ''}` }}
			onClose={onClose}
			render={(closeHanlder) => (
				<div className='flex flex-col gap-4'>
					<h3 className='mb-4'>حذف روز کاری</h3>
					<h2 className='text-center'>
						آیا از حذف وظیفه <span className='text-primary-1'>" {selectedItem?.title} "</span> اطمینان دارید؟
					</h2>
					<PrimaryButton content='حذف' onClick={() => deleteTimeHandler(closeHanlder)} />
				</div>
			)}
		/>
	);
};

export default DeleteItem;
