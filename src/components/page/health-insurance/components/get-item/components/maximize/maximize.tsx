import {
	AttachmentFileCard,
	PrimaryBreadcrumb,
	PrimaryButton,
	PrimaryCard,
	PrimaryInput,
	PrimaryRadioButton,
	PrimarySkeleton,
	SecondaryTable,
} from '@attom';
import { page_healthInsurance } from '@context';
import { useRoutes } from '@hooks';
import { Insurance, User } from '@models';
import { CheckboxCard, PageModalHeader } from '@molecule';

export type MaximizeProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Maximize: React.FC<MaximizeProps> = ({
	//
	boxProps,
}) => {
	const { state, initState, overWrite, setState } = page_healthInsurance.useContext();
	const { getItem, editItem, $agencyList, $branchList, $marketerList, $designList } = state;
	const { _getItem, $getItem, selectedItem } = getItem;

	const router = useRoutes();

	const changeSectionScope = (values: Partial<typeof getItem> = {}) => overWrite({ scope: 'getItem', value: { ...values } });

	const onClose = () => {
		overWrite({ scope: '', value: { getItem: initState.getItem } });
	};

	const renderEdit = () => {
		setState((PS) => ({ ...PS, getItem: initState.getItem, editItem: { ...editItem, selectedItem: selectedItem } }));
	};

	const breadcrumb = [
		{ type: 'back', onClick: onClose },
		{ svgIcon: 'home', onClick: () => router.push('/') },
		{ name: 'بیمه نامه ها', onClick: onClose },
		{ name: 'اطلاعات بیمه نامه' },
	];

	const downloadAsset = (item) => {};
	const addEndorsement = () => changeSectionScope({ showAddEndorsement: true });

	const $enums = {
		agency: ($agencyList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		branch: ($branchList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		marketer: ($marketerList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		design: ($designList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
	};

	if (!selectedItem) return null;

	return (
		<PrimaryCard
			boxProps={boxProps}
			loading={_getItem === 'loading'}
			loadingType={() => (
				<div className='px-[20px] pointer-events-none'>
					<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />
					{/* Header Title */}
					<PageModalHeader
						space='mt-[28px]'
						title='جزئیات بیمه نامه'
						// onEdit={renderEdit}
						onMinimize={() => changeSectionScope({ maximize: false })}
					/>

					<div className='mt-[28px] px-[24px] py-[32px] border border-cancel-20 rounded-[16px]'>
						<div className='text-[20px] font-[700]'>اطلاعات بیمه نامه</div>

						<div className='grid grid-cols-12 gap-x-[24px] gap-y-[32px] pt-[32px]'>
							<PrimarySkeleton boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4 h-[45px]' }} />
							<PrimarySkeleton boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4 h-[45px]' }} />
							<PrimarySkeleton boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4 h-[45px]' }} />
						</div>
					</div>
				</div>
			)}
		>
			<div className='px-[20px]'>
				<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />
				{/* Header Title */}
				<PageModalHeader
					space='mt-[28px]'
					title='جزئیات بیمه نامه'
					// onEdit={renderEdit}
					onMinimize={() => changeSectionScope({ maximize: false })}
				/>

				<div className='mt-[28px] px-[24px] border border-cancel-20 rounded-[16px] border-t border-cancel-20'>
					{/* 1 */}
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[24px] py-[32px]'>
						<div className='col-span-12 text-[20px] font-[700]'>اطلاعات بیمه نامه</div>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='کد رایانه بیمه نامه'
							value={selectedItem?._id || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='شماره بیمه نامه'
							value={selectedItem?.insuranceNum || ''}
							disabled
						/>

						<div className='col-span-12 md:col-span-6 lg:col-span-4'>
							<div className='text-[13px] min-h-[30px] font-[500]'>وضعیت بیمه نامه</div>
							<div className='min-h-[50px] flex items-end'>
								<CheckboxCard
									elProps={{ className: 'min-h-[40px]' }}
									labelClass='text-[16px]'
									label={Insurance.status[selectedItem?.status] || selectedItem?.status || 'جاری'}
									color={Insurance.statusColor[selectedItem?.status] || ''}
									hideCheckBox
									readOnly
								/>
							</div>
						</div>

						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='تاریخ شروع'
							value={selectedItem?.fields?.startDate?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='تاریخ پایان'
							value={selectedItem?.fields?.endDate?.value || ''}
							disabled
						/>
						<PrimaryRadioButton
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							title='نوع بیمه نامه'
							value={selectedItem?.fields?.offerType?.value || ''}
							options={Insurance.typeList}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='طرح'
							value={$enums.design[selectedItem?.fields?.offer?.value || '']?.name || selectedItem?.fields?.offer?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='نحوه پرداخت'
							value={
								Insurance.paymentType[selectedItem?.fields?.paymentType?.value] || selectedItem?.fields?.paymentType?.value || ''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='واحد صدور'
							value={
								$enums.branch[selectedItem?.fields?.sodurUnit?.value || '']?.faName ||
								selectedItem?.fields?.sodurUnit?.value ||
								''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='واحد معرف'
							value={
								$enums.agency[selectedItem?.fields?.moarefUnit?.value || '']?.faName ||
								selectedItem?.fields?.moarefUnit?.value ||
								''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='بازاریاب'
							value={
								// $enums.marketer[selectedItem?.fields?.marketer?.value || '']?.faName ||
								selectedItem?.fields?.marketer?.value?.faName || ''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='شرکت بیمه گر قبلی'
							value={selectedItem?.fields?.lastInsuranceCompany?.value?.faName || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='حق بیمه'
							value={selectedItem?.fee || ''}
							disabled
							priceMode
							suffix='ریال'
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='درصد تخفیف'
							value={selectedItem?.xXx || ''}
							disabled
							priceMode
							suffix='%'
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='درصد اضافه نرخ'
							value={selectedItem?.xXx || ''}
							disabled
							priceMode
							suffix='%'
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='ارائه کننده خدمات خسارت'
							value={selectedItem?.fields?.recompenseServiceProvider?.value?.faName || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='امکان صدور معرفی نامه'
							value={
								(selectedItem?.fields?.canIssueIntroduction?.value === 'true' && 'بله') ||
								(selectedItem?.fields?.canIssueIntroduction?.value === 'false' && 'خیر') ||
								''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='صدور معرفی نامه تحت وب'
							value={
								(selectedItem?.fields?.canIssueIntroductionOnline?.value === 'true' && 'بله') ||
								(selectedItem?.fields?.canIssueIntroductionOnline?.value === 'false' && 'خیر') ||
								''
							}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='ذینفع بیمارستانی'
							value={selectedItem?.fields?.hospitalZinaf?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='ذینفع پارا'
							value={selectedItem?.fields?.paraZinaf?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='حداکثر مهلت رسیدگی خسارت پس از اتمام بیمه نامه'
							value={selectedItem?.fields?.expRecompenseAfter?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='حداکثر مهلت رسیدگی خسارت در طول بیمه نامه'
							value={selectedItem?.fields?.expRecompenseIn?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='نوع محاسبه نسبت خسارت'
							value={selectedItem?.xXx || ''}
							disabled
						/>
					</div>
					{/* 2 */}
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[24px] py-[32px] border-t border-cancel-20'>
						<div className='col-span-12 text-[20px] font-[700]'>اطلاعات بیمه شدگان</div>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='کد ملی بیمه گزار'
							value={selectedItem?.fields?.issuerNationalCode?.value || ''}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='بیمه گزار'
							value={`${selectedItem?.fields?.firstName?.value || ''} ${selectedItem?.fields?.lastName?.value || ''}`}
							disabled
						/>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='سن بیمه گزار'
							value={selectedItem?.fields?.age?.value || ''}
							disabled
						/>

						<div className='col-span-12 pt-[20px]'>
							<div className='col-span-12 text-[18px] font-[700] flex items-center bord'>لیست بیمه شدگان</div>
							<SecondaryTable
								list={selectedItem?.fields?.issued?.value || []}
								boxProps={{ className: 'mt-[20px]' }}
								headers={['نام و نام‌خانوادگی', 'کد ملی', 'سن', 'جنسیت', 'نسبت']}
								listItemRender={(item: API_insurance_issued, i) => [
									`${item?.relativeFirstName || ''} ${item?.relativeLastName || ''}`,
									item?.relativeNationalCode ?? '',
									item?.xXx ?? '',
									User.gender[item?.genderKey] || item?.genderKey || '',
									item?.relativeTitle ?? '',
								]}
							/>
						</div>
					</div>

					{/* 3 */}
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[24px] py-[32px] border-t border-cancel-20'>
						<div className='col-span-12 text-[20px] font-[700]'>فایل های پیوست شده</div>

						{(selectedItem?.xXx || []).map((item, i) => (
							<AttachmentFileCard
								key={i}
								boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
								file={item as any}
								onDownload={() => downloadAsset(item)}
							/>
						))}
					</div>

					{/* 3 */}
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[24px] py-[32px] border-t border-cancel-20'>
						<div className='col-span-12 flex items-center justify-between'>
							<span className='text-[20px] font-[700]'>الحاقیه</span>

							<PrimaryButton content='ثبت الحاقیه' color='primary-2-outline' onClick={() => addEndorsement()} />
						</div>
					</div>
				</div>
			</div>
		</PrimaryCard>
	);
};
