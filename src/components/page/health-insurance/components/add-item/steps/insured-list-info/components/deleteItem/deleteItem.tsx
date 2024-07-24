import { PrimaryButton, PrimaryModal, SVGIcon } from '@attom';
import { page_healthInsurance } from '@context';

export const DeleteItem = () => {
	const { state, overWrite, initState } = page_healthInsurance.useContext();
	const { form } = state.addItem;
	const { insuredListInfo } = form;
	const { deleteItem, $insuredItems } = insuredListInfo;
	const { _deleteItem, selectedItem } = deleteItem;

	const onClose = () => {
		overWrite({
			scope: 'addItem.form.insuredListInfo',
			value: { deleteItem: initState.addItem.form.insuredListInfo.deleteItem },
		});
	};

	const deleteItemHandler = (closeHandler) => {
		const filteredList = $insuredItems.filter((item) => item?.id !== selectedItem?.id);

		overWrite({
			scope: 'addItem.form.insuredListInfo',
			value: { $insuredItems: filteredList },
		});
		closeHandler();
	};

	return (
		<PrimaryModal
			onClose={onClose}
			hideCloseIcon
			backdropDisable
			boxSize='w-full max-w-[400px]'
			boxProps={{ className: 'rounded-[16px]' }}
			render={(closeHandler) => (
				<div className='flex flex-col items-center justify-center gap-[32px] px-[32px] py-[32px]'>
					<SVGIcon width='w-16' icon='infoCircle' textColor='text-warning' />
					<div className='w-full flex flex-col items-center justify-center text-center gap-[12px] text-[14px]'>
						<div className='text-[20px] font-[700]'>حذف بیمه شده</div>
						<div className='flex flex-wrap items-center justify-center gap-2'>
							<span className='text-text-tertiary'>آیا از حذف بیمه شده اطمینان دارید؟</span>
						</div>
					</div>
					<div className='w-full flex justify-between gap-6'>
						<PrimaryButton
							boxProps={{ className: 'flex-1' }}
							content='حذف'
							color='primary-2-outline'
							onClick={() => deleteItemHandler(closeHandler)}
							// onClick={closeHandler}
							elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
							textColor='text-cancel'
						/>
						<PrimaryButton content='بازگشت' onClick={closeHandler} boxProps={{ className: 'flex-1' }} />
					</div>
				</div>
			)}
		></PrimaryModal>
	);
};
