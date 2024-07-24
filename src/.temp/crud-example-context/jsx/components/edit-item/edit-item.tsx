import { PrimaryButton, PrimaryCard, PrimaryInput, PrimaryModal, PrimarySkeleton, Row } from '@attom';

import { page_example } from '@context';
import { useDidMount, useFormValidation, useRoutes } from '@hooks';
import { regex } from '@utils';

export type EditItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const EditItem: React.FC<EditItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_example.useContext();
	const { editItem } = state;
	const { _editItem, form, selectedItem } = editItem;
	const { name } = form;

	const actions = page_example.useActions();

	const router = useRoutes();

	const onClose = () => {
		overWrite({ scope: '', value: { editItem: initState.editItem } });
		router.removeQuery(['render', 'id']);
	};

	const changeSectionScope = (values: Partial<typeof editItem> = {}) => overWrite({ scope: 'editItem', value: { ...values } });
	const changeFormScope = (values: Partial<typeof form> = {}) => overWrite({ scope: 'editItem.form', value: { ...values } });

	useDidMount(() => {
		if (!selectedItem) return;

		changeFormScope({});
	}, [selectedItem]);

	const editItemHandler = () => actions.editItem({ okCB: onClose });

	const mainValidation = {
		name: { isValid: regex.name.test(name), invalidMessage: 'نام معتبر نمی باشد' },
	};

	const { isValidForm, invalidItems } = useFormValidation(mainValidation);

	return (
		<PrimaryModal
			onClose={onClose}
			onCloseDisabled={_editItem === 'loading'}
			fullscreenEnable
			render={(closeHandler) => (
				<PrimaryCard
					boxProps={boxProps}
					elProps={{ className: 'px-4 pt-4' }}
					loading={_editItem === 'loading'}
					loadingType={() => (
						<div className='min-h-[100px] flex flex-col gap-8 px-4 py-8'>
							<PrimarySkeleton boxProps={{ className: 'w-[100px] h-[10px]' }} />
							<PrimarySkeleton boxProps={{ className: 'w-[full] h-[45px]' }} />
						</div>
					)}
					// onClick={() => changeSectionScope({ _editItem: _editItem === 'loading' ? 'ok' : 'loading' })}
				>
					{/* Header */}
					<div className='flex items-center gap-2'>
						<i className='fa fa-circle gradient-text-primary' />
						<span className='font-bold underline underline-offset-8 gradient-text-primary'>ویرایش</span>
					</div>

					{/* Body */}
					<div className='pt-3'>
						<Row boxProps={{ className: 'py-[8px] gap-4' }}>
							<PrimaryInput
								boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
								label='نام'
								placeholder='نام'
								value={name}
								onChange={(value) => changeFormScope({ name: value })}
								isValid={mainValidation.name.isValid && null}
								required
							/>
						</Row>

						<div className='flex items-center justify-end pt-6 gap-6'>
							<PrimaryButton
								boxProps={{ className: 'min-w-[150px]' }}
								content='ویرایش'
								onClick={editItemHandler}
								disabled={!isValidForm}
							/>
							<PrimaryButton
								boxProps={{ className: 'min-w-[150px]' }}
								content='بازگشت'
								bgColor='bg-cancel'
								onClick={closeHandler}
							/>
						</div>
						<div className='text-danger text-[14px] min-h-[20px] mt-1 text-end'>{invalidItems[0]?.invalidMessage || ''}</div>
					</div>
				</PrimaryCard>
			)}
		/>
	);
};
