export class Obligation {
	//__________ STATUS __________//
	static status = {
		ACTIVE: 'فعال',
		DEACTIVE: 'غیرفعال',
	};

	static statusColor = {
		ACTIVE: 'success',
		DEACTIVE: 'warning',
	};

	static statusList = Object.keys(this.status).map((key) => ({ value: key, name: this.status[key] }));

	//__________ TYPE __________//
	static type = {
		Family: 'خانواده',
		Group: 'گروهی',
	};

	static typeList = Object.keys(this.type).map((key) => ({ value: key, name: this.type[key] }));

	//__________ kind TYPE __________//
	static kindType = {
		1: 'بیمارستانی',
		2: 'پاراکلینیکی',
	};

	static kindTypeList = Object.keys(this.kindType).map((key) => ({ value: +key, name: this.kindType[key] }));
}
