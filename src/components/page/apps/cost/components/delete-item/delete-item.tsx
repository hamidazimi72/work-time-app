import { PrimaryButton, PrimaryModal } from '@attom';
import { page_cost } from '@context';
import { useToast } from '@hooks';

export type DeleteItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const DeleteItem: React.FC<DeleteItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_cost.useContext();
	const { deleteItem } = state;
	const { selectedItem } = deleteItem;

	const actions = page_cost.useActions();

	const { showToast } = useToast();

	const onClose = () => {
		overWrite({ value: { ...initState.deleteItem }, scope: 'deleteItem' });
	};

	const deleteCostHandler = (closeHanlder: () => void) => {
		actions.deleteItem({
			okCB(res) {
				closeHanlder();
				showToast({ message: 'هزینه با موفقیت حذف گردید!', showIcon: true, type: 'success' });
			},
		});
	};

	return (
		<PrimaryModal
			boxProps={boxProps}
			onClose={onClose}
			render={(closeHanlder) => (
				<div className='flex flex-col gap-4'>
					<h3 className='mb-4'>حذف هزینه</h3>
					<h2 className='text-center'>
						آیا از حذف هزینه <span className='text-primary-1'>" {selectedItem?.category} "</span> اطمینان دارید؟
					</h2>
					<PrimaryButton content='ثبت' onClick={() => deleteCostHandler(closeHanlder)} />
				</div>
			)}
		/>
	);
};

export default DeleteItem;
