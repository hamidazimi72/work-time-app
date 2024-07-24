export class Contract {
	//__________ STATUS __________//
	static status = {
		ACTIVE: 'فعال',
		DEACTIVE: 'غیرفعال',
		EXPIRED: 'منقضی شده',
	};

	static statusColor = {
		ACTIVE: 'success',
		DEACTIVE: 'warning',
		EXPIRED: 'danger',
	};

	static statusList = Object.keys(this.status).map((key) => ({ value: key, name: this.status[key] }));

	//__________ TYPE __________//
	static type = {
		Family: 'خانواده',
		Group: 'گروهی',
	};

	static typeList = Object.keys(this.type).map((key) => ({ value: key, name: this.type[key] }));
}
