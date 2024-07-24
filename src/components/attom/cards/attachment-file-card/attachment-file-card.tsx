// import axios from 'axios';
import { useState } from 'react';

import { Block, SVGIcon } from '@components/attom';
import { useDidMount } from '@hooks';
import { api } from '@services';

export type AttachmentFileCardProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
	file: File;
	// status: Service_status;
	onDownload?: () => void | null;
	onDelete?: () => void | null;
	// onReload?: () => void | null;
};

export const AttachmentFileCard: React.FC<AttachmentFileCardProps> = ({
	boxProps,
	file,
	// status,
	onDownload = null,
	onDelete = null,
	// onReload = null,
}) => {
	const [status, setStatus] = useState<Service_status>('init');
	const [loadedPercent, setLoadedPercent] = useState<number>(0);
	const [deg, setDeg] = useState<string>('90');

	const borderColor = (status === 'fail' && 'border-[#F04438]') || '#EAECF0';
	const iconColor =
		(status === 'loading' && 'text-[#1975FF]') ||
		(status === 'ok' && 'text-[#17B26A]') ||
		(status === 'fail' && 'text-[#F04438]') ||
		'text-[#1975FF]';

	const fileSizeCalculator = (size: number) => {
		let result: string;
		if (size < 1024) {
			result = `${size} B`;
		} else if (size < 1024 * 1024) {
			result = `${(size / 1024).toFixed(2)} KB`;
		} else if (size < 1024 * 1024 * 1024) {
			result = `${(size / (1024 * 1024)).toFixed(2)} MB`;
		} else {
			result = `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
		}
		return result;
	};

	const uploadFileHandler = () => {
		setStatus('loading');

		const onOkHandler = (res: any) => {
			// console.log(res);
			if (res?.statusCode === 200) {
				setStatus('ok');
			} else {
				setStatus('fail');
			}
		};

		const onFailHandler = (err: any) => {
			setStatus('fail');
			// console.log(err);
		};

		api.$uploader_upload_POST(
			{ onOk: onOkHandler, onFail: onFailHandler },
			{
				body: { file: file, fileType: 'image' },
				onUploadProgress: (progressEvent) => {
					let total = progressEvent?.total || 0;
					let loaded = progressEvent?.loaded;
					const percent = +((loaded / total) * 100).toFixed();
					const deg = percent > 50 ? `${90 + (180 * (percent / 2)) / 50}` : `${90 + (180 * percent) / 50}`;
					setLoadedPercent(percent);
					setDeg(deg);
				},
				header: { 'Content-Type': 'multipart/form-data' },
			},
		);
	};

	// const uploadFileHandler2 = async () => {
	// 	setStatus('loading');

	// 	const formData = new FormData();
	// 	formData.append('file', file);

	// 	axios
	// 		.post('https://tmpfiles.org/api/v1/upload', formData, {
	// 			onUploadProgress: (progressEvent) => {
	// 				let total = progressEvent?.total || 0;
	// 				let loaded = progressEvent?.loaded;
	// 				const percent = +((loaded / total) * 100).toFixed();
	// 				const deg = percent > 50 ? `${90 + (180 * (percent / 2)) / 50}` : `${90 + (180 * percent) / 50}`;
	// 				setLoadedPercent(percent);
	// 				setDeg(deg);
	// 			},
	// 		})
	// 		.then((res) => {
	// 			setStatus('ok');
	// 			console.log(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setStatus('fail');
	// 		});
	// };

	useDidMount(() => {
		uploadFileHandler();
	}, [file]);

	return (
		<Block boxProps={boxProps}>
			<div className={`relative bg-white border ${borderColor} rounded-2xl p-6 flex flex-col justify-between`}>
				<div className='flex gap-2 items-center'>
					<div className='relative z-10 w-12 h-12 rounded-full bg-background-secondary flex justify-center items-center'>
						<SVGIcon icon='file' width='w-6' textColor={iconColor} />

						{status === 'ok' && (
							<span className='flex justify-center items-center w-4 h-4 rounded-full bg-white absolute right-0 bottom-0'>
								<SVGIcon icon='starCheck' width='w-[13px]' textColor={iconColor} />
							</span>
						)}
					</div>
					<div className='flex-1 flex gap-3 justify-end'>
						{status === 'fail' && (
							<span
								className='flex items-center gap-2 text-[#F04438] text-xs font-semibold cursor-pointer'
								onClick={uploadFileHandler}
							>
								<SVGIcon icon='rotateRight' width='w-4' textColor='text-[#F04438]' />
								تلاش مجدد
							</span>
						)}
						{onDownload && (
							<span onClick={onDownload}>
								<SVGIcon boxProps={{ className: 'cursor-pointer' }} icon='download' width='w-4' textColor='text-[#98A2B3]' />
							</span>
						)}
						{onDelete && (
							<span onClick={onDelete}>
								<SVGIcon boxProps={{ className: 'cursor-pointer' }} icon='trash' width='w-4' textColor='text-[#98A2B3]' />
							</span>
						)}
					</div>
				</div>
				<span className='h-8 text-xs font-semibold text-[#F04438] flex items-center'>
					{status === 'fail' && `خطا در بارگذاری فایل,لطفا مجدد تلاش کنید`}
				</span>
				<div className='flex justify-between items-center gap-2 text-xs'>
					<span className='text-[#0D121C] font-semibold'>{file?.name}</span>
					<span className='text-[#667085] font-medium' dir='ltr'>
						{fileSizeCalculator(file?.size)}
					</span>
				</div>

				{status === 'loading' && (
					<div
						className='absolute top-[22px] right-[22px] w-[52px] h-[52px] flex justify-center items-center rounded-full bg-[#1975FF]'
						style={{
							backgroundImage: `linear-gradient(${deg}deg, transparent 50%, ${loadedPercent > 50 ? `#1975FF` : `#fff`} 50%), linear-gradient(90deg, #fff 50%, transparent 50%)`,
						}}
					>
						<div className='w-12 h-12 bg-white rounded-full'></div>
					</div>
				)}
			</div>
		</Block>
	);
};
