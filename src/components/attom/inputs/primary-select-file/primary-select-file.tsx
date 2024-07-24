import { useDropzone } from 'react-dropzone';

import { images } from '@data';

export type PrimarySelectFileProps = {
	accept?: { [key: string]: string[] };
	disabled?: boolean;
	multiple?: boolean;
	maxFiles?: number;
	maxSize?: number;
	//
	onChange?: (e: any) => any;
};

export const PrimarySelectFile: React.FC<PrimarySelectFileProps> = ({
	accept = { 'image/png': ['.png'], 'image/jpg': ['.jpg'], 'image/jpeg': ['.jpeg'] },
	disabled = false,
	multiple = false,
	maxFiles = 1,
	maxSize = 5242880, // 5mb
	//
	onChange = () => {},
}) => {
	const onDropAccepted = (files: any) => {
		// console.log('accepted', files);
		if (!onChange) return;

		onChange(files[0]);
	};

	const onDropRejected = (e: any) => {
		console.log('rejected', e);
	};

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		disabled,
		multiple,
		maxFiles,
		maxSize,
		accept,
		onDropAccepted,
		onDropRejected,
	});

	const disabledCN = 'bg-[#F2F4F799] cursor-not-allowed';
	const enabledCN = 'bg-[#FCFCFD] cursor-pointer';

	return (
		<div
			{...getRootProps({
				className: `relative h-[320px] overflow-hidden border border-dashed border-cancle rounded-2xl flex flex-col justify-center items-center gap-4 select-none ${disabled ? disabledCN : enabledCN}`,
			})}
		>
			<input {...getInputProps()} />

			<img alt='attachment' src={images.attachment.src} className={`h-[100px]mb-2 ${disabled ? `grayscale opacity-70` : ``}`} />
			<div className={`flex items-center gap-1 text-base font-semibold ${disabled ? `grayscale opacity-40` : ``}`}>
				<span className='text-primary-1'>جستجو فایل در دستگاه</span>
				یا فایل را بکشید و رها کنید
			</div>
			<span className={`text-xs text-[#667085] font-medium ${disabled ? `grayscale opacity-30` : ``}`}>
				فقط فایل های تصویری و متنی (حداکثر 5 مگابایت)
			</span>

			{disabled && (
				<div className='bg-white text-xs font-semibold px-2 py-1 rounded-[32px] inline-flex gap-2 items-center'>
					<span className='bg-[#FDB022] text-white font-medium rounded-xl px-2 py-1'>توجه</span>
					<span className='text-[#B54708]'>تا زمان بارگذاری فایل ها، منتظر بمانید.</span>
				</div>
			)}
		</div>
	);
};
