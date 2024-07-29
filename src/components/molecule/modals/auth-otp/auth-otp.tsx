// import React, { useState } from 'react';
// import { useDidMount } from '@hooks';

// import CS from './auth-otp.module.scss';
// import { images } from '@data';

// import { Block, InputOtp, PrimaryButton, SVGIcon } from '@attom';

// export type AuthOtpProps = {
// 	boxProps?: React.HTMLAttributes<HTMLDivElement>;
// 	mobile?: string;
// 	otp?: string;
// 	//
// 	onChangeOtp?: ((otp: string) => any) | null;
// 	onSendOtp?: (() => any) | null;
// 	onResetOtp?: ((resetTimer: () => any) => any) | null;
// 	onClose?: (() => any) | null;
// 	//
// 	_checkOtp?: Service_status;
// 	_resetOtp?: Service_status;

// 	message?: string;
// };

// export const AuthOtp: React.FC<AuthOtpProps> = ({
// 	boxProps,
// 	mobile = '',
// 	otp = '',
// 	//
// 	onChangeOtp = () => {},
// 	onSendOtp = () => {},
// 	onResetOtp = () => {},
// 	onClose = () => {},
// 	//
// 	_checkOtp,
// 	_resetOtp,
// 	message = '',
// }) => {
// 	const [timer, setTimer] = useState(0);

// 	const timerActive = timer > 0;
// 	const loading = _checkOtp === 'loading';

// 	useDidMount(() => {
// 		if (timer > 0) {
// 			setTimeout(() => {
// 				setTimer((num) => {
// 					return num - 1;
// 				});
// 			}, 1000);
// 		}
// 	}, [timer]);

// 	const formatTime = () => {
// 		const min = Math.floor(timer / 60);
// 		const sec = timer % 60;
// 		return `${min}:${sec < 10 ? '0' : ''}${sec}`;
// 	};

// 	const handelrClose = () => {
// 		if (typeof onClose === 'function') {
// 			onClose();
// 		}
// 	};
// 	const changeOtpHandler = (changeOtp: string, event: any) => {
// 		if (typeof onChangeOtp === 'function' && !loading) {
// 			onChangeOtp(changeOtp);
// 		}
// 	};
// 	const sendOtpHandler = (event) => {
// 		if (typeof onSendOtp === 'function' && !loading) {
// 			onSendOtp();
// 		}
// 	};
// 	const resetOtpHandler = () => {
// 		if (typeof onResetOtp === 'function' && !loading) {
// 			const resetTimer = () => {
// 				setTimer(120);
// 			};
// 			onResetOtp(resetTimer);
// 		}
// 	};

// 	return (
// 		<Block {...boxProps} boxProps={{ className: ` ${boxProps?.className || ''} ` }}>
// 			<div className={` ${CS.container} relative flex w-full p-12 flex-col justify-center items-center gap-8 flex-shrink-0`}>
// 				<SVGIcon
// 					elProps={{
// 						onClick: handelrClose,
// 						className:
// 							'flex justify-center items-center absolute left-6 top-6 p-1 border border-solid border-cancel-30 rounded-lg cursor-pointer',
// 					}}
// 					textColor='text-cancel-30 hover:text-danger'
// 					icon='close'
// 					width='w-8'
// 					height='h-8'
// 				/>
// 				{_checkOtp === 'ok' ? (
// 					<>
// 						<img src={images.success.src} alt='' className={` w-[144px] h-[144px] `} />
// 						<div className={` flex flex-col justify-center items-center gap-4 self-stretch `}>
// 							<div
// 								className={` self-stretch text-[#0d121c] text-center text-[21px] not-italic font-bold leading-[180%] capitalize `}
// 							>
// 								برداشت با موفقیت انجام شد
// 							</div>
// 							<div
// 								className={` self-stretch text-[#667085] text-center text-[16px] not-italic font-semibold leading-[180%] capitalize `}
// 							>
// 								<span>پرداخت حق بیمه با موفقیت انجام شد و حق بیمه از موجودی کیف پول کسر گردید</span>
// 							</div>
// 						</div>
// 						<PrimaryButton
// 							onClick={handelrClose}
// 							boxProps={{ className: ` h-14 self-stretch ` }}
// 							elProps={{ className: 'px-6 rounded-xl' }}
// 							contentClass={'gap-2 self-stretch'}
// 						>
// 							<div className='text-center text-[16px] not-italic font-semibold leading-[180%] capitalize'>متوجه شدم !</div>
// 						</PrimaryButton>
// 					</>
// 				) : (
// 					<>
// 						<img src={images.success?.src} alt='' className={`flex w-[144px] h-[144px] px-[7px] justify-center items-center `} />
// 						<div className={` flex flex-col justify-center items-center gap-4 self-stretch `}>
// 							<div
// 								className={'self-stretch text-[#0d121c] text-center text-[21px] not-italic font-bold leading-[180%] capitalize'}
// 							>
// 								اعتبار سنجی
// 							</div>
// 							<div
// 								className={
// 									'self-stretch text-[#667085] text-center text-[16px] not-italic font-semibold leading-[180%] capitalize'
// 								}
// 							>
// 								کد ارسال شده به {mobile} را وارد کنید
// 							</div>
// 						</div>
// 						<InputOtp
// 							isValid={_checkOtp === 'fail' ? false : null}
// 							disabled={loading}
// 							onChange={changeOtpHandler}
// 							value={otp || ''}
// 							message={message}
// 						/>

// 						<div className={` flex flex-col justify-center items-center gap-4 self-stretch `}>
// 							<div className='h-14 px-6'>
// 								{timerActive ? (
// 									<div className='flex justify-center items-center gap-2 self-stretch text-primary-2'>
// 										<SVGIcon icon='timer' width='w-6' height='h-6' />
// 										<div className='text-center text-[16px] not-italic font-semibold leading-[180%] capitalize'>
// 											{formatTime()} تا ارسال مجدد
// 										</div>
// 									</div>
// 								) : (
// 									<div
// 										className={`text-center text-[16px] not-italic font-semibold leading-[180%] capitalize cursor-pointer ${_resetOtp === 'loading' ? 'pointer-events-none opacity-80' : ''} text-primary-2`}
// 										onClick={resetOtpHandler}
// 									>
// 										ارسال مجدد کد تایید
// 									</div>
// 								)}
// 							</div>

// 							<PrimaryButton
// 								disabled={loading || !/^\d{5}$/.test(otp)}
// 								onClick={sendOtpHandler}
// 								boxProps={{ className: ` h-14 self-stretch ` }}
// 								elProps={{ className: 'px-6 rounded-2xl' }}
// 								contentClass='text-center text-[16px] not-italic font-semibold leading-[180%] capitalize'
// 								content='تایید'
// 							/>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 		</Block>
// 	);
// };
// export default AuthOtp;
