import { PrimaryBreadcrumb, PrimaryCard, PrimarySkeleton } from '@attom';

import { page_healthInsurance } from '@context';
import { useDidMount, useFormValidation, useRoutes } from '@hooks';
import { PageModalHeader } from '@molecule';
import { regex } from '@utils';

export type EditItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const EditItem: React.FC<EditItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_healthInsurance.useContext();
	const { editItem } = state;
	const { _editItem, form, selectedItem } = editItem;
	const { name } = form;

	const actions = page_healthInsurance.useActions();

	const router = useRoutes();

	const onClose = () => {
		overWrite({ scope: '', value: { editItem: initState.editItem } });
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

	const breadcrumb = [
		{ type: 'back', onClick: () => router.push('/') },
		{ svgIcon: 'home', onClick: () => router.push('/') },
		{ name: 'بیمه نامه ها', onClick: onClose },
		{ name: 'ویرایش بیمه نامه' },
	];

	return (
		<PrimaryCard
			boxProps={boxProps}
			loading={_editItem === 'loading'}
			loadingType={() => (
				<div className='px-[20px] pointer-events-none'>
					<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />
					{/* Header Title */}
					<PageModalHeader space='mt-[28px]' title='ویرایش بیمه نامه' />

					<div className='mt-[28px] p-[20px] border border-cancel-20 rounded-[16px]'>
						<PrimarySkeleton boxProps={{ className: 'w-[full] h-[45px]' }} />
					</div>
				</div>
			)}
		>
			<div className='px-[20px]'>
				<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />
				{/* Header Title */}
				<PageModalHeader space='mt-[28px]' title='ویرایش بیمه نامه' />

				<div className='mt-[28px] p-[20px] border border-cancel-20 rounded-[16px]'></div>
			</div>
		</PrimaryCard>
	);
};
