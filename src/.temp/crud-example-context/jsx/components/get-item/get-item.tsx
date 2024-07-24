import { PrimaryButton, PrimaryCard, PrimaryModal, PrimarySkeleton } from '@attom';
import { page_example } from '@context';
import { useRoutes } from '@hooks';

export type GetItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const GetItem: React.FC<GetItemProps> = ({
	//
	boxProps,
}) => {
	const { state, initState, overWrite } = page_example.useContext();
	const { getItem } = state;
	const { _getItem, selectedItem } = getItem;

	const actions = page_example.useActions();

	const changeSectionScope = (values: Partial<typeof getItem> = {}) => overWrite({ scope: 'getItem', value: { ...values } });

	const router = useRoutes();

	const onClose = () => {
		overWrite({ scope: '', value: { getItem: initState.getItem } });
		router.removeQuery(['render', 'id']);
	};

	const getItemHandler = () => actions.getItem();

	return (
		<PrimaryModal
			onClose={onClose}
			onCloseDisabled={_getItem === 'loading'}
			render={(closeHandler) => (
				<PrimaryCard
					boxProps={boxProps}
					elProps={{ className: 'text-center py-3 px-5' }}
					loading={_getItem === 'loading'}
					loadingType={() => (
						<div className='min-h-[100px] flex flex-col gap-8 px-4 py-8'>
							<PrimarySkeleton boxProps={{ className: 'w-[100px] h-[10px]' }} />
							<PrimarySkeleton boxProps={{ className: 'w-[full] h-[45px]' }} />
						</div>
					)}
					// onClick={() => changeSectionScope({ _getItem: _getItem === 'loading' ? 'ok' : 'loading' })}
				>
					{/* Header Title */}
					<div className='flex items-center justify-between'>
						<div className='font-bold'>جزئیات</div>
					</div>

					{/*  */}
					<div className='flex items-center flex-wrap gap-1 pt-4'></div>

					<div className='flex items-center justify-end pt-6 gap-4'>
						<PrimaryButton elProps={{ className: 'min-w-[150px]' }} bgColor='bg-cancel' content='بازگشت' onClick={closeHandler} />
					</div>
				</PrimaryCard>
			)}
		/>
	);
};
