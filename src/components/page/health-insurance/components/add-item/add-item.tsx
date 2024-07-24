import { PrimaryBreadcrumb, PrimaryCard, PrimarySkeleton, PrimaryStepper } from '@attom';

import { page_healthInsurance } from '@context';
import { useDidMount, useRoutes } from '@hooks';
import { PageModalHeader } from '@molecule';

import { Attachments, InsurancePolicyInfo, InsuredListInfo, IssuingInfo, IsurerInfo, MedicalQuestions } from './steps';

export type AddItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const AddItem: React.FC<AddItemProps> = ({
	//
	boxProps,
}) => {
	const { state, overWrite, initState } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { _addItem, form, selectedItem } = addItem;
	const { step, insurancePolicyInfo } = form;
	const { offerType } = insurancePolicyInfo;

	const router = useRoutes();

	const changeFormScope = (values: Partial<typeof form> = {}) => overWrite({ scope: 'addItem.form', value: { ...values } });

	const onClose = () => {
		overWrite({ scope: '', value: { addItem: initState.addItem } });
	};

	const breadcrumb = [
		{ type: 'back', onClick: () => router.push('/') },
		{ svgIcon: 'home', onClick: () => router.push('/') },
		{ name: 'بیمه نامه ها', onClick: onClose },
		{ name: 'ثبت بیمه نامه' },
	];

	useDidMount(() => {
		if (!selectedItem) return;

		// double check - this is sample
		const step =
			(selectedItem?.currentStep === 'insurancePolicyDetails' && 'insurancePolicyInfo') ||
			(selectedItem?.currentStep === 'insurancePolicyInformation' && 'insurerInfo') ||
			(selectedItem?.currentStep === 'issuerInformation' && 'insuredListInfo') ||
			(selectedItem?.currentStep === 'issuedInformation' && 'medicalQuestions') ||
			form.step;

		// const sodurUnit =  selectedItem?.fields?.sodurUnit?.value || form.issuingInfo?.sodurUnit

		changeFormScope({ step });
	}, [selectedItem]);

	return (
		<PrimaryCard
			boxProps={boxProps}
			loading={_addItem === 'loading'}
			loadingType={() => (
				<div className='px-5 pointer-events-none'>
					<PrimaryBreadcrumb boxProps={{ className: 'mt-7' }} paths={breadcrumb} />
					{/* Header Title */}
					<PageModalHeader space='mt-7' title='ثبت بیمه نامه' />

					<div className='mt-7 p-5 border border-cancel-20 rounded-[16px]'>
						<PrimarySkeleton boxProps={{ className: 'w-[full] h-[45px]' }} />
					</div>
				</div>
			)}
		>
			<div className='px-5'>
				<PrimaryBreadcrumb boxProps={{ className: 'mt-7' }} paths={breadcrumb} />
				{/* Header Title */}
				<PageModalHeader space='mt-7' title='ثبت بیمه نامه' />

				<div className='mt-7 p-10 border border-cancel-20 rounded-[16px]'>
					{!offerType && (
						<PrimaryStepper
							boxProps={{ className: 'mb-10' }}
							options={[
								{ name: 'اطلاعات صدور', value: 'issuingInfo' },
								{ name: 'اطلاعات بیمه نامه', value: 'insurancePolicyInfo' },
								{ name: '', value: '' },
							]}
							value={step}
						/>
					)}
					{offerType === 'Family' && (
						<PrimaryStepper
							boxProps={{ className: 'mb-10' }}
							options={[
								{ name: 'اطلاعات صدور', value: 'issuingInfo' },
								{ name: 'اطلاعات بیمه نامه', value: 'insurancePolicyInfo' },
								{ name: 'اطلاعات بیمه گزار', value: 'insurerInfo' },
								{ name: 'اطلاعات بیمه شده ', value: 'insuredListInfo' },
								{ name: 'سوالات پزشکی', value: 'medicalQuestions' },
								{ name: 'پیوست بیمه نامه ', value: 'attachments' },
								{ name: 'تایید نهایی', value: 'confirm' },
							]}
							value={step}
						/>
					)}
					{offerType === 'Group' && (
						<PrimaryStepper
							boxProps={{ className: 'mb-10' }}
							options={[
								{ name: 'اطلاعات صدور', value: 'issuingInfo' },
								{ name: 'اطلاعات بیمه نامه', value: 'insurancePolicyInfo' },
								{ name: 'اطلاعات بیمه گزار', value: 'insurerInfo' },
								{ name: 'پیوست بیمه نامه ', value: 'attachments' },
								{ name: 'تایید نهایی', value: 'confirm' },
							]}
							value={step}
						/>
					)}
					{step === 'issuingInfo' && <IssuingInfo onClose={onClose} />}
					{step === 'insurancePolicyInfo' && <InsurancePolicyInfo />}
					{step === 'insurerInfo' && <IsurerInfo />}
					{step === 'insuredListInfo' && <InsuredListInfo />}
					{step === 'medicalQuestions' && <MedicalQuestions />}
					{step === 'attachments' && <Attachments />}
				</div>
			</div>
		</PrimaryCard>
	);
};
