type ObserveType = (data?: any) => any;

let instance;
export class Observer {
	observer: ObserveType[];

	constructor() {
		this.observer = [];
	}

	subscribe(item: ObserveType) {
		this.observer.push(item);
	}

	unsubscribe(item: ObserveType) {
		this.observer.filter((subscribe) => subscribe !== item);
	}

	notify(data?: any) {
		this.observer.forEach((item) => item(data));
	}

	// Singletoon Design Pattern
	static getInstance() {
		if (!instance) instance = new Observer();

		return instance;
	}
}

// export global - runnig in compoiling :
// export const observer = new Observer();
