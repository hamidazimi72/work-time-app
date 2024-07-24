import { useState } from 'react';

import moment from 'jalali-moment';

import { PrimaryCalendar, PrimaryInput, PrimaryInputProps, PrimaryModal } from '@attom';

export type PrimaryDatepickerProps = PrimaryInputProps & { jalaaliInput?: boolean; geoCalendar?: boolean };

export const PrimaryDatepicker: React.FC<PrimaryDatepickerProps> = ({
	//
	boxProps,
	elProps,
	jalaaliInput,
	geoCalendar,

	value,
	onChange,
	disabled,

	...props
}) => {
	const [showCalendar, setShowCalendar] = useState(false);

	const isValidDate = !jalaaliInput
		? Date.parse(String(value || ''))
		: /^\d{4}[/-]{1}\d{2}[/-]{1}\d{2}/.test(String(value || ''));

	const valueISO =
		jalaaliInput && !geoCalendar
			? isValidDate && moment(value, 'jYYYY/jMM/jDD')
				? moment(value, 'jYYYY/jMM/jDD')?.toISOString() || ''
				: ''
			: isValidDate
				? new Date(value || '')?.toISOString() || ''
				: '';

	const displayValue = geoCalendar ? valueISO || '' : valueISO ? moment(valueISO).locale('fa').format('YYYY/MM/DD') : '';

	return (
		<>
			<PrimaryInput
				value={displayValue}
				disabled={disabled}
				suffixIcon='calendar'
				boxProps={{
					className: `${boxProps?.className || ''} ${disabled ? 'pointer-events-none' : ''} cursor-pointer`,
					onClick: () => setShowCalendar(true),
				}}
				elProps={{ ...elProps, className: `${elProps?.className || ''} pointer-events-none` }}
				readOnly
				{...props}
			/>

			{showCalendar && (
				<PrimaryModal
					onClose={() => setShowCalendar(false)}
					boxSize='w-[90vw] max-w-[500px]'
					render={(onClose) => (
						<PrimaryCalendar
							value={valueISO}
							onChange={(geo, jalaali) => {
								if (onChange) onChange(jalaaliInput ? jalaali : geo, null);
								onClose();
							}}
						/>
					)}
				></PrimaryModal>
			)}
		</>
	);
};

export default PrimaryDatepicker;
