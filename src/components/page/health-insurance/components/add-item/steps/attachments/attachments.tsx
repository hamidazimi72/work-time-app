import { useState } from 'react';

import { AttachmentFileCard, PrimaryButton, PrimarySelectFile } from '@attom';
import { page_healthInsurance } from '@context';

export const Attachments = () => {
	const { state, overWrite } = page_healthInsurance.useContext();
	const { addItem } = state;
	const { form } = addItem;
	const { attachments } = form;
	const { _download } = attachments;

	const actions = page_healthInsurance.useActions();

	const [attachmentsList, setAttachmentsList] = useState<File[]>([]);

	const onDeleteHanlder = (file: File) => {
		const filteredList = attachmentsList.filter((item) => item?.name !== file?.name);

		setAttachmentsList([...filteredList]);
	};

	const prevStepHandler = () => {
		overWrite({ scope: 'addItem.form', value: { step: 'medicalQuestions' } });
	};

	const nextStepHandler = () => {
		actions.addItem_attachments({ attachments: attachmentsList.map((item) => item?.name) });
		// overWrite({ scope: 'addItem.form', value: { step: 'confirm' } });
	};

	return (
		<div className='flex flex-col gap-8'>
			<h2 className='text-[#000] text-[21px] font-bold'>پیوست بیمه نامه</h2>

			<PrimarySelectFile disabled={false} onChange={(file) => setAttachmentsList([...attachmentsList, file])} />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{attachmentsList.map((item, i) => (
					<AttachmentFileCard
						boxProps={{ className: 'col-span-1' }}
						key={i}
						file={item}
						onDelete={() => onDeleteHanlder(item)}
						onDownload={() => actions.fileDownload_attachments({ fileName: item?.name })}
					/>
				))}
			</div>

			<div className='col-span-3 flex justify-between gap-4'>
				<PrimaryButton
					content='بازگشت'
					onClick={prevStepHandler}
					boxProps={{ className: 'w-40' }}
					elProps={{ className: '!border-solid border border-cancel bg-transparent' }}
					textColor='text-cancel'
				/>
				<PrimaryButton
					content='ذخیره و ادامه'
					disabled={_download === 'loading'}
					onClick={nextStepHandler}
					boxProps={{ className: 'w-40' }}
				/>
			</div>
		</div>
	);
};
