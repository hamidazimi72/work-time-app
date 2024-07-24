module.exports = {
	swDest: './out/sw.js',
	swSrc: './service-worker/sw.js',
	globDirectory: './out/',
	globPatterns: ['**/*.{html,css,woff2,ttf,png,svg,js,json}'],
	globIgnores: ['/404.html'],
};
