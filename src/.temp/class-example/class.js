class supExample {
	#pro1;

	constructor(arg1) {
		this.pro1 = arg1;
	}

	set pro1(value) {
		this.#pro1 = value;
	}

	get pro1() {
		return this.#pro1;
	}
}

class subExample extends supExample {
	#pro2;

	constructor(arg1, arg2) {
		super(arg1);
		this.pro2 = arg2;
	}

	set pro2(value) {
		this.#pro2 = value;
	}

	get pro2() {
		return this.#pro2;
	}
}
