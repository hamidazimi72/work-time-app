type Config = {
	color: string;
	padding: string;
	margin: string;
	backgroundColor: string;
	borderRadius: string;
	[key: string]: string;
};

export class ConsoleAPI {
	static styledLog = (content: any, config: Partial<Config> = {}) => {
		const style = Object.keys(config).reduce((result: string, currentKey: string) => {
			const currentValue = config[currentKey];

			if (currentValue) result += `${currentKey.replace(/[A-Z]/g, '-$&').toLowerCase()}:${currentValue}; `;
			return result;
		}, '');

		console.log(`%c${content}`, style);
	};
}
