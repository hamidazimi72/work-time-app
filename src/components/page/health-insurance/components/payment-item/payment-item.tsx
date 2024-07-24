import { useState } from 'react';

import { PrimaryBreadcrumb, PrimaryButton, PrimaryCard, PrimaryInput, PrimaryModal } from '@attom';
import { AuthOtp } from '@molecule';
import { page_healthInsurance } from '@context';
import { images } from '@data';
import { useDidMount, useRoutes } from '@hooks';
import { PageModalHeader } from '@molecule';
import { api } from '@services';

export type PaymentItemProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const PaymentItem: React.FC<PaymentItemProps> = ({
	//
	boxProps,
}) => {
	const { state, initState, overWrite, setState } = page_healthInsurance.useContext();
	const { paymentItem, $agencyList, $branchList, $marketerList } = state;
	const { selectedItem, $checkWallet, _checkWallet, $sendOtp, _sendOtp, _sendLink, $sendLink, form } = paymentItem;
	const { otp } = form;

	const [showSendLinkModal, setShowSendLinkModal] = useState(false);
	const [showSendOtpModal, setShowSendOtpModal] = useState(false);

	const router = useRoutes();

	const changeSectionScope = (values: Partial<typeof paymentItem> = {}) =>
		overWrite({ scope: 'paymentItem', value: { ...values } });

	const changeFormScope = (values: Partial<typeof form> = {}) => overWrite({ scope: 'paymentItem.form', value: { ...values } });

	const onClose = () => {
		overWrite({ scope: '', value: { paymentItem: initState.paymentItem } });
	};

	const actions = page_healthInsurance.useActions();

	const checkWallet = () =>
		api.$serviceSimulator_POST(
			{
				onStatus: (status) => changeSectionScope({ _checkWallet: status }),
				onOk: (res) => changeSectionScope({ $checkWallet: res }),
			},
			{ okResponse: true },
		);

	const sendLink = () =>
		api.$serviceSimulator_POST(
			{
				onStatus: (status) => changeSectionScope({ _sendLink: status }),
				onOk: (res) => {
					changeSectionScope({ $sendLink: res });
					setShowSendLinkModal(true);
				},
			},
			{ okResponse: true },
		);

	const sendOtp = () =>
		api.$serviceSimulator_POST(
			{
				onStatus: (status) => changeSectionScope({ _sendOtp: status }),
				onOk: (res) => {
					changeSectionScope({ $sendOtp: res });
					setShowSendOtpModal(true);
				},
			},
			{ okResponse: true },
		);

	//vars
	const balanceIsOk = $checkWallet?.xXx || true;

	const $enums = {
		agency: ($agencyList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		branch: ($branchList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
		marketer: ($marketerList || []).reduce((r, c) => ({ ...r, [c._id]: c }), {}),
	};

	useDidMount(() => {
		if (!$checkWallet) return;

		if (balanceIsOk) sendOtp();
		if (!balanceIsOk) sendLink();
	}, [$checkWallet]);

	const breadcrumb = [
		{ type: 'back', onClick: () => router.push('/') },
		{ svgIcon: 'home', onClick: () => router.push('/') },
		{ name: 'بیمه نامه ها', onClick: onClose },
		{ name: 'تسویه بیمه نامه' },
	];

	if (!selectedItem) return null;

	return (
		<PrimaryCard boxProps={boxProps}>
			<div className={`px-[20px] ${_checkWallet === 'loading' ? 'pointer-events-none opacity-80' : ''}`}>
				<PrimaryBreadcrumb boxProps={{ className: 'mt-[28px]' }} paths={breadcrumb} />
				{/* Header Title */}
				<PageModalHeader space='mt-[28px]' title='تسویه بیمه نامه' />

				<div className='mt-[28px] px-[20px] border border-cancel-20 rounded-[16px] py-[32px]'>
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[32px]'>
						<div className='col-span-12 text-[20px] font-[700]'>اطلاعات بیمه نامه</div>
						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='کد بیمه نامه'
							value={selectedItem?._id || ''}
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
							label='تاریخ پرداخت'
							value={selectedItem?.fields?.xXx?.value || ''}
							disabled
						/>
					</div>

					{/*  */}
					<div className='grid grid-cols-12 gap-x-[24px] gap-y-[32px] mt-[32px] pt-[32px] border-t border-cancel-20'>
						<div className='col-span-12 text-[20px] font-[700] w-full'>مبلغ قابل پرداخت</div>

						<PrimaryInput
							boxProps={{ className: 'col-span-12 md:col-span-6 lg:col-span-4' }}
							label='حق بیمه'
							value={selectedItem?.fields?.xXx?.value || ''}
							disabled
							priceMode
						/>

						<div className='col-span-12 md:col-span-6 lg:col-span-8 flex items-center justify-end'>
							{!$checkWallet && (
								<PrimaryButton
									content='پرداخت حق بیمه'
									onClick={checkWallet}
									loading={_checkWallet === 'loading' || _sendLink === 'loading' || _sendOtp === 'loading'}
									labelSpace
								/>
							)}

							{$checkWallet && balanceIsOk && (
								<PrimaryButton
									content='پرداخت حق بیمه'
									onClick={checkWallet}
									loading={_checkWallet === 'loading' || _sendLink === 'loading' || _sendOtp === 'loading'}
									labelSpace
								/>
							)}

							{$checkWallet && !balanceIsOk && (
								<PrimaryButton
									content='ارسال مجدد لینک پرداخت'
									onClick={sendLink}
									loading={_checkWallet === 'loading' || _sendLink === 'loading' || _sendOtp === 'loading'}
									labelSpace
								/>
							)}
						</div>
					</div>

					{/*  */}
					<div className='mt-[100px] flex items-center'>
						<PrimaryButton elProps={{ className: 'min-w-[180px]' }} content='بازگشت' color='cancel-outline' onClick={onClose} />
					</div>
				</div>
			</div>

			{showSendLinkModal && (
				<PrimaryModal
					onClose={() => {
						actions.fetchItems();
						onClose();
					}}
					hideCloseIcon
					backdropDisable
					boxSize='w-full max-w-[400px]'
					boxProps={{ className: 'rounded-[16px]' }}
					render={(closeHandler) => (
						<div className='flex flex-col items-center justify-center gap-[32px] px-[32px] py-[32px]'>
							<img alt='' src={images.success.src} className='w-[140px]' />
							<div className='w-full flex flex-col items-center justify-center text-center gap-[12px] text-[14px]'>
								<div className='text-[20px] font-[700]'>ارسال لینک</div>
								<div className='flex flex-wrap items-center justify-center gap-2'>
									<span className='text-text-tertiary'>لینک پرداخت با موفقیت به بیمه گزار</span>
									<span className='font-[700]'>" {$sendLink?.name || ''} "</span>
									<span className='text-text-tertiary'>ارسال گردید</span>
								</div>
							</div>
							<div className='w-full'>
								<PrimaryButton content='تایید' color='primary-2-outline' onClick={() => closeHandler()} />
							</div>
						</div>
					)}
				></PrimaryModal>
			)}

			{showSendOtpModal && (
				<PrimaryModal
					onClose={() => {
						overWrite({
							scope: 'fetchItems',
							value: {
								$fetchItems: state.fetchItems.$fetchItems.map((item) =>
									item._id === selectedItem?._id ? { ...item, status: 'CALCULATED' } : item,
								),
							},
						});
						onClose();
					}}
					hideCloseIcon
					backdropDisable
					boxSize='w-full max-w-[400px]'
					boxProps={{ className: 'rounded-[16px]' }}
					render={(closeHandler) => (
						<AuthOtp
							//
							onClose={closeHandler}
							otp={otp}
							_checkOtp='ok'
							onChangeOtp={(value) => changeFormScope({ otp: value })}
						/>
					)}
				/>
			)}
		</PrimaryCard>
	);
};
