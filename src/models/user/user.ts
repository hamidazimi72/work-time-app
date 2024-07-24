export class User {
	//__________ GENDER __________//
	static gender = {
		Male: 'مرد',
		Female: 'زن',
	};

	static genderList = Object.keys(this.gender).map((key) => ({ value: key, name: this.gender[key] }));
}
