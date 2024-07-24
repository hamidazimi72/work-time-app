export class StringAPI {
	static camelize(str: string | number | null | boolean | undefined) {
		if (typeof str !== 'string') return '';

		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}
}
