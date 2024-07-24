/** @type {import('next').NextConfig} */

module.exports = {
	// Next Config
	output: 'export',
	optimizeFonts: false,
	reactStrictMode: false,
	trailingSlash: true,
	// Module Config
	typescript: {
		// ignoreBuildErrors: true, //Dangerus
	},
	eslint: {
		dirs: ['.'],
	},
	// Environment
	env: {},
};
