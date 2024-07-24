import { PrimaryButton, PrimaryDatepicker, PrimaryInput, PrimarySelect, SVGIcon, SideModal } from '@attom';
import { useDidMount } from '@hooks';
import { api } from '@services';
import { useState } from 'react';

import * as icons from '@components/attom/icons/svg-icon/icons';

export type HomeProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Home: React.FC<HomeProps> = ({
	//
	boxProps,
}) => {
	const [state, setState] = useState('');
	const [state2, setState2] = useState<any>(null);

	const callService = () => {
		// api.$user_signin_POST(
		// 	{
		// 		onOk: (res) => {
		// 			console.log(res);
		// 		},
		// 		onFail: (res) => {
		// 			console.log(res);
		// 		},
		// 	},
		// 	{ body: { nationalCode: '1361266082' } },
		// );
	};

	useDidMount(() => {
		callService();
	});

	const onCloseModal = () => setState('');

	return (
		<div {...boxProps} className={`${boxProps?.className || ''}`}>
			<div className='grid grid-cols-12 gap-4 p-4'>
				<PrimaryInput
					boxProps={{ className: 'col-span-4' }}
					label='لیبل 1'
					placeholder='لیبل 1 را وارد کنید'
					value={state}
					onChange={(value) => setState(value)}
					prefix='fa fa-user'
					prefixIcon
					suffix='ریال'
					required
				/>
				<PrimaryInput
					boxProps={{ className: 'col-span-4' }}
					label='لیبل 2'
					placeholder='لیبل 2 را وارد کنید'
					value={state}
					onChange={(value) => setState(value)}
					isValid={false}
					validationMessage='معتبر نمی باشد'
				/>
				<PrimarySelect
					boxProps={{ className: 'col-span-4' }}
					label='لیبل 5'
					placeholder='لیبل 5 را وارد کنید'
					options={[
						{ name: '1', value: '1' },
						{ name: '2', value: '2' },
						{ name: '3', value: '3' },
					]}
					value={state2}
					onChange={(item) => setState2(item?.value)}
					dataTable
					prefixIcon='search'
					disabled
				/>
				<PrimaryInput
					boxProps={{ className: 'col-span-4' }}
					label='لیبل 3'
					placeholder='لیبل 3 را وارد کنید'
					value={state}
					onChange={(value) => setState(value)}
					disabled
					isValid={false}
					validationMessage='معتبر نمی باشد'
					prefixIcon='calendar'
				/>
				<PrimaryDatepicker
					boxProps={{ className: 'col-span-4' }}
					label='تاریخ'
					placeholder='تاریخ را وارد کنید'
					value={state}
					onChange={(value) => setState(value)}
					disabled
					isValid={false}
					validationMessage='معتبر نمی باشد'
				/>
				<PrimaryButton boxProps={{ className: 'col-span-4' }} content='لیبل 3' labelSpace />
				<PrimaryButton boxProps={{ className: 'col-span-4' }} content='لیبل 3' color='cancel-outline' labelSpace />
				<PrimaryInput
					textarea
					boxProps={{ className: 'col-span-12' }}
					label='لیبل 4'
					placeholder='لیبل 4 را وارد کنید'
					value={state}
					onChange={(value) => setState(value)}
				/>
			</div>

			<div className=''>آیکن ها :</div>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				{Object.keys(icons).map((key: any, i) => (
					<SVGIcon key={i} icon={key} width='w-[50px]' textColor='text-primary-1' />
				))}
			</div>

			{state === '11' && <SideModal onClose={onCloseModal} render={() => <div>hi</div>} />}
		</div>
	);
};
