export class Endorsement {
	//__________ STATUS __________//
	static status = {
		Confirm: 'ثبت موفق',
		Pending_Pay: 'در انتظار پرداخت',
		Draft: 'پیش نویس',
	};

	static statusColor = {
		Confirm: 'success',
		Pending_Pay: 'warning',
		Draft: 'primary',
	};

	static statusList = Object.keys(this.status).map((key) => ({ value: key, name: this.status[key] }));

	//__________ TYPE __________//
	static type = {
		'general-information': 'تغییر در مفاد بیمه نامه - تغییر کلی',
		'member-list': 'ارائه لیست اولیه بیمه شدگان',
		'member-list-info': 'تغییر مشخصات بیمه شدگان',
	};

	static typeList = Object.keys(this.type).map((key) => ({ value: key, name: this.type[key] }));

	//__________ CAUSE __________//
	static cause = {
		Bimegozar: 'درخواست بیمه گزار',
		Bimegar: 'درخواست بیمه گر',
		Mistake: 'اشتباه اپراتور',
	};

	static causeList = Object.keys(this.cause).map((key) => ({ value: key, name: this.cause[key] }));
}
