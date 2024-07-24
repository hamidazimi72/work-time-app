import { bigDecimal } from './asset/big-decimal';

type BigDecimal = {
	add: (num1: string | number, num2: string | number) => string | number;
	subtract: (num1: string | number, num2: string | number) => string | number;
	multiply: (num1: string | number, num2: string | number) => string | number;
	divide: (num1: string | number, num2: string | number) => string | number;
	getPrettyValue: (num: number | number, digit: number, seperator: string) => string;
};

export class MathAPI {
	static bigDecimal: BigDecimal = bigDecimal as any;
	//

	static seperate = (value: string | number, digit: number = 3, seperator: string = ','): string | number => {
		if (value === '' || isNaN(+value)) return value;
		const num = +value || 0;

		const result = this.bigDecimal.getPrettyValue(num, digit || 3, seperator || '-') || '';

		return result;
	};

	static getDifferencePercent = (number1: string | number, number2: string | number): number => {
		const num1 = (typeof number1 === 'string' ? +number1 : number1) || 0;
		const num2 = (typeof number2 === 'string' ? +number2 : number2) || 0;

		const diff = this.subtract(num1, num2);
		const diffPercent = this.divide(diff, num1);

		const result = this.multipy(diffPercent, 100);

		return +result || 0;
	};

	static groupOperation = (operation: 'plus' | 'subtract' | 'multipy' | 'divide', ...numbers: (string | number)[]): number => {
		const method =
			(operation === 'plus' && this.plus) ||
			(operation === 'subtract' && this.subtract) ||
			(operation === 'multipy' && this.multipy) ||
			(operation === 'divide' && this.divide) ||
			null;

		if (!method) return 0;

		const result = numbers.reduce((currentNumber, nextNumber) => {
			return method(currentNumber || 0, nextNumber || 0);
		});

		return +result || 0;
	};

	static plus = (number1: number | string, number2: number | string): number => {
		try {
			const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
			const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

			const result = this.bigDecimal.add(num1, num2);

			return +result || 0;
		} catch (error) {
			return 0;
		}
	};

	static subtract = (number1: number | string, number2: number | string): number => {
		try {
			const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
			const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

			const result = this.bigDecimal.subtract(num1, num2);

			return +result || 0;
		} catch (error) {
			return 0;
		}
	};

	static multipy = (number1: number | string, number2: number | string): number => {
		try {
			const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
			const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

			const result = this.bigDecimal.multiply(num1, num2);

			return +result || 0;
		} catch (error) {
			return 0;
		}
	};

	static divide = (number1: number | string, number2: number | string): number => {
		try {
			const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
			const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

			const result = this.bigDecimal.divide(num1, num2);

			return +result || 0;
		} catch (error) {
			return 0;
		}
	};
}

// export class Maths {
// 	//
// 	static plus = (number1: number | string, number2: number | string) => {
// 		const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
// 		const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

// 		const num1_decimal = num1.split('.')?.[1] || '';
// 		const num2_decimal = num2.split('.')?.[1] || '';

// 		const bigDecimalLenght = num1_decimal.length > num2_decimal.length ? num1_decimal.length : num2_decimal.length;

// 		const fixedLength = bigDecimalLenght + 1;

// 		let result = String(+num1 + +num2);
// 		const result_decimal = result.split('.')?.[1] || '';
// 		if (result_decimal.length > fixedLength) result = String((+result).toFixed(fixedLength));

// 		return +result || 0;
// 	};

// 	static subtract = (number1: number | string, number2: number | string) => {
// 		const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
// 		const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

// 		const num1_decimal = num1.split('.')?.[1] || '';
// 		const num2_decimal = num2.split('.')?.[1] || '';

// 		const bigDecimalLenght = num1_decimal.length > num2_decimal.length ? num1_decimal.length : num2_decimal.length;

// 		const fixedLength = bigDecimalLenght;

// 		let result = String(+num1 - +num2);
// 		const result_decimal = result.split('.')?.[1] || '';
// 		if (result_decimal.length > fixedLength) result = String((+result).toFixed(fixedLength));

// 		return +result || 0;
// 	};

// 	static multipy = (number1: number | string, number2: number | string) => {
// 		const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
// 		const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

// 		const num1_decimal = num1.split('.')?.[1] || '';
// 		const num2_decimal = num2.split('.')?.[1] || '';

// 		const fixedLength = num1_decimal.length + num2_decimal.length;

// 		let result = String(+num1 * +num2);
// 		const result_decimal = result.split('.')?.[1] || '';
// 		if (result_decimal.length > fixedLength) result = String((+result).toFixed(fixedLength));

// 		return +result || 0;
// 	};

// 	static divide = (number1: number | string, number2: number | string) => {
// 		const num1 = String((typeof number1 === 'string' ? +number1 : number1) || 0);
// 		const num2 = String((typeof number2 === 'string' ? +number2 : number2) || 0);

// 		if (+num1 === 0 || +num2 === 0) return 0;

// 		const num1_decimal = num1.split('.')?.[1] || '';
// 		const num2_decimal = num2.split('.')?.[1] || '';

// 		const fixedLength = num1.length + num1.length + 1;

// 		let result = String(+num1 / +num2);
// 		const result_decimal = result.split('.')?.[1] || '';
// 		if (result_decimal.length > fixedLength) result = String((+result).toFixed(fixedLength));

// 		return +result || 0;
// 	};
// }
