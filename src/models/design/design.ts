export class Design {
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

	//__________ PaymentMode __________//
	static paymentMode = {
		YEARLY: 'سالانه',
		MONTHLY: 'ماهانه',
	};

	static paymentModeList = Object.keys(this.paymentMode).map((key) => ({ value: key, name: this.paymentMode[key] }));
}
