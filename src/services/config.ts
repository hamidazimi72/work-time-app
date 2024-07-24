const servers = {
	test_dev: {
		base: 'https://work-time-app.liara.run',
	},
	test_prod: {
		base: 'https://work-time-app.liara.run',
	},
};

//--* Change URI from Here *--//
const URI_dev = servers.test_dev;
const URI_production = servers.test_prod;

const isDevMode = process.env.NODE_ENV !== 'production';

export const appConfig = {
	isDevelopment: isDevMode,
	apiBaseUrl: isDevMode ? URI_dev : URI_production,
	timeout: 30000,
};

export default appConfig;
