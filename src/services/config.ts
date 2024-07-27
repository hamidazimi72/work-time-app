const servers = {
	test_dev: {
		// base: 'http://localhost:9000',
		base: 'http://api.hamid-azimi.ir',
	},
	test_prod: {
		base: 'http://api.hamid-azimi.ir',
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
