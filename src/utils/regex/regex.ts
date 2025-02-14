export const regex = {
	// auth
	token: /^.{30,}$/,
	// public
	postalCode: /^\d{10}$/,
	phone: /^\d{11}$/,
	cellphone: /^09\d{9}$/,
	password: /^.{6,}$/,
	username: /^.{3,}$/,
	name: /^.{1,}$/,
	any: /^.{1,}$/,
	description: /^.{3,200}/,
	lastName: /^.{1,}$/,
	address: /^.{5,}$/,
	otp: /^\d{6}$/,
	date: /^.{1,}$/,
	image: /^.{1,}$/,
	email:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
