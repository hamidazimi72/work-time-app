import { toast } from 'react-toastify';

import { ToastOptions, ToastProps } from 'react-toastify/dist/types';

type Type = 'danger' | 'success' | 'warning';
type BodyOptions = { type?: Type; title?: string; message?: string; showIcon?: boolean };

const Msg: React.FC<
	BodyOptions & {
		[key: string]: any;
		toastProps?: ToastProps;
		closeToast?: () => any;
	}
> = ({
	closeToast,
	toastProps,
	//
	message,
	title,
	type,
	showIcon,
}) => {
	const gradientClass =
		(type === 'success' && 'from-transparent to-success from-[10%] to-[160%]') ||
		(type === 'danger' && 'from-transparent to-danger from-[10%] to-[160%]') ||
		(type === 'warning' && 'from-transparent to-warning from-[10%] to-[160%]') ||
		'';

	const latinPattern = /[a-zA-Z]/;
	const isLatin = latinPattern.test(title || '') || latinPattern.test(title || '');

	const iconClass =
		(type === 'success' && 'fa fa-check ') ||
		(type === 'danger' && 'fa fa-exclamation ') ||
		(type === 'warning' && 'fa fa-exclamation') ||
		'';

	const iconColorClass =
		(type === 'success' && 'bg-success text-white') ||
		(type === 'danger' && 'bg-danger text-white') ||
		(type === 'warning' && 'bg-warning text-white') ||
		'';

	return (
		<div
			className={`relative cursor-pointer bg-background-primary bg-gradient-to-r ${gradientClass} ${isLatin ? 'dir-ltr ltr' : 'dir-rtl rtl'} w-full select-none text-text-primary text-[14px] border rounded-[8px] px-4 py-[6px] min-w-[300px]`}
		>
			<div className='flex items-center justify-between gap-[20px]'>
				<div className='grow'>
					{title && (
						<div className='flex items-center justify-start text-[14px] py-[6px] text-text-secondary'> {title || ''}</div>
					)}
					{message && (
						<div className='flex items-center justify-start text-text-secondary py-[6px] text-[12px]'>{message || ''}</div>
					)}
				</div>

				{showIcon && (
					<span
						className={`${iconColorClass} opacity-75 ${!title || !message ? 'w-[25px] h-[25px]' : 'w-[35px] h-[35px]'} flex items-center justify-center rounded-full`}
					>
						<i className={`${iconClass} !text-[16px]`} />
					</span>
				)}
			</div>
		</div>
	);
};

export const useToast = () => {
	const showToast = (bodyOptions: BodyOptions, toastOptions?: ToastOptions) => {
		const currentToast =
			(bodyOptions?.type === 'danger' && toast.error) ||
			(bodyOptions?.type === 'success' && toast.success) ||
			(bodyOptions?.type === 'warning' && toast.warning) ||
			toast;

		currentToast(<Msg {...bodyOptions} />, toastOptions);
		// toast.success(<Msg message={'اطلاعات با موفقیت ثبت شد'} title={'عملیات موفق'} type={'success'} showIcon />, toastOptions);
		// toast.success(<Msg message={'اطلاعات با موفقیت ثبت شد'} type={'success'} showIcon />, toastOptions);
		// toast.success(<Msg title={'عملیات موفق'} type={'success'} showIcon />, toastOptions);
		// toast.warning(<Msg message={'اطلاعات با موفقیت ثبت شد'} title={'عملیات موفق'} type={'warning'} showIcon />, toastOptions);
	};

	return { showToast };
};
