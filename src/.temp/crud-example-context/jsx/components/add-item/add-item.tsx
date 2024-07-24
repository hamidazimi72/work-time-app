import { PrimaryButton, PrimaryCard, PrimaryInput, PrimaryModal, PrimarySkeleton, Row } from '@attom';

import { page_example } from '@context';
import { useFormValidation, useRoutes } from '@hooks';
import { regex } from '@utils';

export type AddItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AddItem: React.FC<AddItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_example.useContext();
	const { addItem } = state;
	const { _addItem, form } = addItem;
	const { name } = form;

	const actions = page_example.useActions();

	const router = useRoutes();

	const onClose = () => {
		overWrite({ scope: '', value: { addItem: initState.addItem } });
		router.removeQuery(['render', 'id']);
	};

	const changeSectionScope = (values: Partial<typeof addItem> = {}) => overWrite({ scope: 'addItem', value: { ...values } });
	const changeFormScope = (values: Partial<typeof form> = {}) => overWrite({ scope: 'addItem.form', value: { ...values } });

	const addItemHandler = () => actions.addItem({ okCB: onClose });

	const mainValidation = {
		name: { isValid: regex.name.test(name), invalidMessage: 'نام معتبر نمی باشد' },
	};

	const { isValidForm, invalidItems } = useFormValidation(mainValidation);

	return (
		<PrimaryModal
			onClose={onClose}
			onCloseDisabled={_addItem === 'loading'}
			fullscreenEnable
			render={(closeHandler) => (
				<PrimaryCard
					boxProps={boxProps}
					elProps={{ className: 'px-4 pt-4' }}
					loading={_addItem === 'loading'}
					loadingType={() => (
						<div className='min-h-[100px] flex flex-col gap-8 px-4 py-8'>
							<PrimarySkeleton boxProps={{ className: 'w-[100px] h-[10px]' }} />
							<PrimarySkeleton boxProps={{ className: 'w-[full] h-[45px]' }} />
						</div>
					)}
					// onClick={() => changeSectionScope({ _addItem: _addItem === 'loading' ? 'ok' : 'loading' })}
				>
					{/* Header */}
					<div className='flex items-center gap-2'>
						<i className='fa fa-circle gradient-text-primary' />
						<span className='font-bold underline underline-offset-8 gradient-text-primary'>افزودن</span>
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
								content='افزودن'
								onClick={addItemHandler}
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
