/* eslint-disable react-hooks/exhaustive-deps */

type Data = {
	[key: string]: {
		isValid: boolean | any;
		[key: string]: any;
	};
};

type Config = { isValidProperty?: string };

const validationFields = (data: {
	value?: string | number | object | null;
	isValid?: boolean | null;
	required?: boolean | null;
	invalidMessage?: string | null;
	emptyMessage?: string | null;
	submittedInvalidForm?: boolean;
}): { isValid: boolean | null; message: string | null | JSX.Element } => {
	// data
	const value = data?.value || '';
	const isValid = data?.isValid || false;
	const required = data?.required || false;
	const invalidMessage = data?.invalidMessage || '';
	const emptyMessage = data?.emptyMessage || 'پر کردن این فیلد اجباری است.';
	const submittedInvalidForm = data?.submittedInvalidForm || false;

	// IS VALID
	if (isValid && required && !value)
		return {
			isValid: null,
			message: (
				<div className={`pt-[4px] text-[11px] ${submittedInvalidForm ? 'text-danger' : 'text-text-primary-50'}`}>
					{emptyMessage}
				</div>
			),
		};

	if (isValid) return { isValid: null, message: null };

	// IS INVALID
	if (required && !value)
		return {
			isValid: submittedInvalidForm ? false : null,
			message: (
				<div className={`pt-[4px] text-[11px] ${submittedInvalidForm ? 'text-danger' : 'text-text-primary-50'}`}>
					{emptyMessage}
				</div>
			),
		};

	if (!required && !value) return { isValid: null, message: null };

	return { isValid: false, message: <div className='pt-[4px] text-[11px] text-danger'>{invalidMessage}</div> };
};

export const useFormValidation = (data: Data, config?: Config) => {
	const isValidProperty = config?.isValidProperty || 'isValid';

	const invalidItems: { [key: string]: any }[] = Object.keys(data)
		.filter((key) => !data[key][isValidProperty])
		.map((invalidKey) => ({ name: invalidKey, ...data[invalidKey] }));

	const validItems = Object.keys(data)
		.filter((key) => data[key][isValidProperty])
		.map((validKey) => ({ name: validKey, ...data[validKey] }));

	const isValidForm = invalidItems.length === 0;

	return { validItems, invalidItems, isValidForm, validationFields };
};
