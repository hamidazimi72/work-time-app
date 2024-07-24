export class HealthQuestionnarie {
	//__________ STATUS __________//
	static status = {
		COMPLETED: 'تکمیل شده',
		UNCOMPLETED: 'تکمیل نشده',
	};

	static statusColor = {
		COMPLETED: 'success',
		UNCOMPLETED: 'warning',
	};

	static statusList = Object.keys(this.status).map((key) => ({ value: key, name: this.status[key] }));
}
