export class userAgentAPI {
	//----------* Get OS *----------//
	static getOS = () => {
		if (typeof window === undefined || !('navigator' in window)) return null;

		const userAgent = navigator.userAgent || '';
		const platform = (navigator as any).userAgentData?.platform || navigator.platform || '';

		const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
		const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
		const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

		let result: null | 'MacOS' | 'IOS' | 'Windows' | 'Android' | 'Linux' = null;

		if (macosPlatforms.indexOf(platform) !== -1) result = 'MacOS';
		else if (iosPlatforms.indexOf(platform) !== -1) result = 'IOS';
		else if (windowsPlatforms.indexOf(platform) !== -1) result = 'Windows';
		else if (/Android/.test(userAgent)) result = 'Android';
		else if (/Linux/.test(platform)) result = 'Linux';

		return result;
	};
}
