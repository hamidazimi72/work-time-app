export class Insurance {
	//__________ STATUS __________//
	static status = {
		CALCULATED: 'پرداخت شده',
		NOT_CALCULATED: 'در انتظار پرداخت',
		DRAFT: 'پیش نویس',
		WAIT_FOR_DOCTOR: 'در انتظار تایید',
		SEND_TO_FINN: 'تسویه شده',
	};

	static statusColor = {
		CALCULATED: 'success',
		NOT_CALCULATED: 'warning',
		DRAFT: 'primary',
		WAIT_FOR_DOCTOR: 'warning',
		SEND_TO_FINN: 'success',
	};

	static statusList = Object.keys(this.status).map((key) => ({ value: key, name: this.status[key] }));

	//__________ STATUS __________//
	static step = {
		issueInformation: 'اطلاعات صدور',
		insurancePolicyInformation: 'اطلاعات بیمه نامه',
		issuerInformation: 'اطلاعات بیمه گزار',
		issuedInformation: 'اطلاعات بیمه شده',
	};

	static stepColor = {
		issueInformation: 'warning',
		insurancePolicyInformation: 'cancel',
		issuerInformation: 'primary',
		issuedInformation: 'success',
	};

	static stepList = Object.keys(this.step).map((key) => ({ value: key, name: this.step[key] }));

	//__________ TYPE __________//
	static type = {
		Family: 'خانواده',
		Group: 'گروهی',
	};

	static typeList = Object.keys(this.type).map((key) => ({ value: key, name: this.type[key] }));

	//__________ PAYMENT MODE __________//
	static paymentMode = {
		Yearly: 'سالانه',
		Monthly: 'ماهانه',
	};

	static paymentModeList = Object.keys(this.paymentMode).map((key) => ({ value: key, name: this.paymentMode[key] }));

	//__________ PaymentType __________//
	static paymentType = {
		CASH: 'نقدی',
		INSTALMENT: 'قسطی',
	};

	static paymentTypeList = Object.keys(this.paymentType).map((key) => ({ value: key, name: this.paymentType[key] }));

	static paymentTypeOrder = {
		CASH: '1',
		INSTALMENT: '2',
	};
}
