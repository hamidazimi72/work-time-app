export class ArrayAPI {
	//
	static chunk = <O>(array: O[] = [], size: number = 1): O[][] => {
		const result: any[] = [];

		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	static findInObject = <O>(
		array: O[] = [],
		property: string = '',
		value: string | number | boolean | null | undefined = true,
	): O | null => array.find((item) => item[property] === value) || null;

	static filterByProperties = <O>(
		array: O[] = [],
		properties: { [key: string]: string | number },
		options?: {
			selectMethod?: 'AND' | 'OR';
			caseSensitive?: boolean;
			skipIfValueIsEmpty?: boolean;
			exactMatch?: boolean;
		},
	): O[] => {
		const selectMethod = options?.selectMethod || 'OR';
		const caseSensitive = options?.caseSensitive || false;
		const skipIfValueIsEmpty = options?.skipIfValueIsEmpty || false;
		const exactMatch = options?.exactMatch || false;

		return array.filter((item) => {
			const propertiesArray = Object.keys(properties).map((key) => ({ keyName: key, value: properties[key] }));

			if (selectMethod === 'OR') {
				const findedItem = (propertiesArray || []).find((propertyItem) => {
					const keyName = propertyItem.keyName;
					const value = propertyItem.value;

					if (!value && skipIfValueIsEmpty) return true;
					const formattedValue = caseSensitive ? String(value || '').toLowerCase() : String(value || '');

					const formattedItemValue = caseSensitive ? String(item[keyName] || '').toLowerCase() : String(item[keyName] || '');

					const isEqual = exactMatch ? formattedItemValue === formattedValue : formattedItemValue.includes(formattedValue);
					return isEqual;
				});

				return findedItem;
			}

			if (selectMethod === 'AND') {
				const isExistEvery = (propertiesArray || []).every((propertyItem) => {
					const keyName = propertyItem.keyName;
					const value = propertyItem.value;

					if (!value && skipIfValueIsEmpty) return true;
					const formattedValue = caseSensitive ? String(value || '').toLowerCase() : String(value || '');

					const formattedItemValue = caseSensitive ? String(item[keyName] || '').toLowerCase() : String(item[keyName] || '');

					const isEqual = exactMatch ? formattedItemValue === formattedValue : formattedItemValue.includes(formattedValue);
					return isEqual;
				});

				return isExistEvery;
			}
		});
	};

	static sortAlphabetically = <O>(list: O[] = [], property: string = '', asc: boolean = true): O[] =>
		list.sort((current, next) => {
			const [currentValue, nextValue] = [current[property] || '', next[property] || ''];

			if (currentValue > nextValue) return asc ? 1 : -1;
			else if (currentValue < nextValue) return asc ? -1 : 1;
			else return 0;
		});
}
