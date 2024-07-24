import { PrimaryButton, PrimaryCard, PrimarySkeleton, SVGIcon, SideModal } from '@attom';
import { page_healthInsurance, sharedActions } from '@context';
import { Insurance } from '@models';
import { CheckboxCard, SideModalHeader } from '@molecule';
import { MathAPI } from '@utils';

export type MinimizeProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Minimize: React.FC<MinimizeProps> = ({
	//
	boxProps,
}) => {
	const { state, initState, overWrite, setState } = page_healthInsurance.useContext();
	const { getItem, paymentItem, $branchList, $designList } = state;
	const { _getItem, $getItem, selectedItem } = getItem;

	const changeSectionScope = (values: Partial<typeof getItem> = {}) => overWrite({ scope: 'getItem', value: { ...values } });

	const onClose = () => {
		overWrite({ scope: '', value: { getItem: initState.getItem } });
	};

	const renderPayment = () => {
		setState((PS) => ({ ...PS, getItem: initState.getItem, paymentItem: { ...paymentItem, selectedItem: selectedItem } }));
	};

	const downloadAsset = (item) => sharedActions.downloadFile({ filename: item?.xXx || '' });
	const addEndorsement = () => changeSectionScope({ showAddEndorsement: true });

	const $enums = {
		branch: ($branchList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		design: ($designList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
	};

	if (!selectedItem) return null;

	return (
		<SideModal
			onClose={onClose}
			onCloseDisabled={_getItem === 'loading'}
			hideCloseIcon
			render={(closeHandler) => (
				<PrimaryCard
					boxProps={boxProps}
					loading={_getItem === 'loading'}
					loadingType={() => (
						<div className=''>
							{/* Header */}
							<SideModalHeader
								space='py-[32px] px-[24px]'
								title='جزئیات بیمه نامه'
								onMaximize={() => changeSectionScope({ maximize: true })}
								onClose={closeHandler}
								disableClose
								disableMaximize
							/>

							{/*  */}
							<div className='py-[32px] px-[24px] gap-[24px] border-b border-text-tertiary-20'>
								<div className='text-[16px] text-cancel'>دکمه های عملیاتی</div>

								<div className='flex items-center pt-[20px]'>
									<PrimaryButton color='cancel-outline' onClick={renderPayment} rounded disabled>
										<div className='flex items-center justify-center gap-3'>
											<SVGIcon icon='coins' textColor='text-inherit' width='w-[24px]' />
											<span className='text-[16px]'>تسویه بیمه نامه</span>
										</div>
									</PrimaryButton>
								</div>
							</div>

							{/*  */}
							<div className='py-[32px] px-[24px]'>
								<div className='text-[20px] font-[700]'>اطلاعات بیمه نامه</div>

								<div className='flex flex-col pt-[32px] gap-[32px]'>
									<PrimarySkeleton boxProps={{ className: 'w-[full] max-w-[200px] h-[20px]' }} />
									<PrimarySkeleton boxProps={{ className: 'w-[full] max-w-[200px] h-[20px]' }} />
									<PrimarySkeleton boxProps={{ className: 'w-[full] max-w-[200px] h-[20px]' }} />
								</div>
							</div>
						</div>
					)}
				>
					{/* Header */}
					<SideModalHeader
						space='py-[32px] px-[24px]'
						title='جزئیات بیمه نامه'
						onMaximize={() => changeSectionScope({ maximize: true })}
						onClose={closeHandler}
					/>

					{/*  */}
					<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
						<div className='text-[16px] text-cancel'>دکمه های عملیاتی</div>

						<div className='flex items-center pt-[20px]'>
							<PrimaryButton
								color='cancel-outline'
								onClick={renderPayment}
								disabled={selectedItem?.status !== 'NOT_CALCULATED'}
								grayscaleDisabled
								rounded
							>
								<div className='flex items-center justify-center gap-3'>
									<SVGIcon icon='coins' textColor='text-inherit' width='w-[24px]' />
									<span className='text-[16px]'>تسویه بیمه نامه</span>
								</div>
							</PrimaryButton>
						</div>
					</div>

					{/* 1 */}
					<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
						<div className='text-[20px] font-[700]'>اطلاعات بیمه نامه</div>

						<div className='flex flex-col pt-[28px] gap-[28px]'>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='dashCircle' width='w-[24px]' />
									<span>وضعیت بیمه نامه</span>
								</span>
								<span className='flex items-center justify-center'>
									<CheckboxCard
										label={Insurance.status[selectedItem?.status] || selectedItem?.status || 'جاری'}
										color={Insurance.statusColor[selectedItem?.status] || ''}
										hideCheckBox
										readOnly
									/>
								</span>
							</div>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='fileShield' width='w-[24px]' />
									<span>کد رایانه بیمه نامه</span>
								</span>
								<span className=''>{selectedItem?._id || ''}</span>
							</div>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='people' width='w-[24px]' />
									<span>نوع بیمه نامه</span>
								</span>
								<span className=''>
									{Insurance.type[selectedItem?.fields?.offerType?.value] || selectedItem?.fields?.offerType?.value || ''}
								</span>
							</div>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='flag' width='w-[24px]' />
									<span>طرح</span>
								</span>
								<span className=''>
									{$enums.design[selectedItem?.fields?.offer?.value || '']?.name || selectedItem?.fields?.offer?.value || ''}
								</span>
							</div>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='building' width='w-[24px]' />
									<span>واحد صدور</span>
								</span>
								<span className=''>
									{$enums.branch[selectedItem?.fields?.sodurUnit?.value || '']?.faName ||
										selectedItem?.fields?.sodurUnit?.value ||
										''}
								</span>
							</div>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='coins' width='w-[24px]' />
									<span>حق بیمه</span>
								</span>
								<span className=''>{MathAPI.seperate(selectedItem?.xXx || '')}</span>
							</div>
						</div>
					</div>

					{/* 2 */}

					<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
						<div className='text-[20px] font-[700]'>اطلاعات بیمه شدگان</div>

						<div className='flex flex-col pt-[28px] gap-[28px]'>
							{/*  */}
							<div className='flex items-center justify-between gap-2'>
								<span className='text-text-tertiary flex items-center gap-3'>
									<SVGIcon icon='user' width='w-[24px]' />
									<span>بیمه گزار</span>
								</span>
								<span className=''>
									{selectedItem?.fields?.firstName?.value || ''} {selectedItem?.fields?.lastName?.value || ''}
								</span>
							</div>

							{/*  */}
							{((selectedItem?.fields?.issued?.value as API_insurance_issued[]) || []).map((item, i) => (
								<div key={i} className='flex items-center justify-between gap-2'>
									<span className='text-text-tertiary flex items-center gap-3'>
										<SVGIcon icon='user' width='w-[24px]' />
										<span>بیمه شده</span>
									</span>
									<span className=''>
										{item?.relativeFirstName || ''} {item?.relativeLastName || ''}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* 3 */}
					<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
						<div className='text-[20px] font-[700]'>فایل های پیوست شده</div>

						<div className='flex flex-wrap items-center pt-[28px] gap-[28px]'>
							{(selectedItem?.xXx || []).map((item, i) => (
								<div
									key={i}
									className='flex items-center gap-2 px-3 py-2 rounded-full border border-text-tertiary-10 cursor-pointer'
									onClick={() => downloadAsset(item)}
								>
									<SVGIcon icon='download' width='w-[24px]' textColor='text-text-tertiary' />
									<span className=''>{item?.xXx || ''}</span>
								</div>
							))}
						</div>
					</div>

					{/* 4 */}
					<div className='py-[32px] px-[24px] border-b border-text-tertiary-20'>
						<div className='flex items-center gap-4'>
							<SVGIcon icon='noteFavorite' width='w-[24px]' textColor='text-text-tertiary' />
							<div className='text-[20px] font-[700]'>الحاقیه</div>
						</div>

						<div className='px-[20px] pt-[20px]'>
							<PrimaryButton content='ثبت الحاقیه' color='primary-2-outline' onClick={() => addEndorsement()} />
						</div>
					</div>
				</PrimaryCard>
			)}
		/>
	);
};
