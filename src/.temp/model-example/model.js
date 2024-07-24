export class Model {
	static type = {
		A: 'ادمین',
		U: 'عضو',
		G: 'میهمان',
	};

	static typeList = Object.keys(this.type).map((key) => ({ value: key, name: this.type[key] }));
}
