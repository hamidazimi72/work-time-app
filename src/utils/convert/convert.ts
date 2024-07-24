import { prototypes } from '@utils';

export class Convert {
	//
	static faDigitToEn = (str: string | number = ''): string => {
		if (typeof str === 'number') str = String(str);

		return str.replace(/[۰-۹]/g, (num) => prototypes.persianDigitProtoType[num] || num);
	};

	static arabicCharToFa = (str: string | number = ''): string => {
		if (typeof str === 'number') str = String(str);

		return str.replace(/[كدِبِزِذِشِسِىيي١٢٣٤٥٦٧٨٩٠]/g, (char) => prototypes.arabicCharProtoType[char] || char);
	};

	static fileToBase64 = (
		e: any,
		cb: (result?: string | ArrayBuffer | null, base64?: string, data?: { size?: number; name?: string; type: string }) => any,
	) => {
		if (!e.target.value) return;

		const trimToBase64 = (readerResult) => {
			return readerResult?.replace(/^data:[a-zA-Z]{2,10}\/[a-z]+;base64,/, '');
		};

		const size = e?.target?.files[0]?.size || 0;
		const name = e?.target?.files[0]?.name || '';
		const type = e?.target?.files[0]?.type || '';
		// const type = e?.target?.files[0]?.name.split('.')[1] || '';
		const file = e?.target?.files[0];

		const reader = new FileReader();
		reader.onloadend = () => {
			const base64 = trimToBase64(reader.result);
			return cb ? cb(reader.result, base64, { size, name, type }) : null;
		};
		reader.readAsDataURL(file);
	};

	static fileToText = (e, cb: (result: string | ArrayBuffer | null) => {}) => {
		const file = e?.target?.files[0] ?? null;
		if (!file) return;

		const reader = new FileReader();

		reader.onload = () => {
			const result = reader.result;
			return cb ? cb(result) : null;
		};

		reader.readAsText(file, 'utf-8');
	};
}
