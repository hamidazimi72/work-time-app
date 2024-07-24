import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/tailwind.config';
import { Language } from '@models';
import { LocalStorageAPI } from '@utils';

import { useContext } from '.';

export const useActions = () => {
	const { state, setState, initState, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const setWindowSize = async (parameters?: Action_callbacks & { event?: Event }) => {
		const [height, width] = [window.innerHeight, window.innerWidth];

		overWrite({ scope: 'windowSize', value: { height, width } });
	};

	const setResponsiveSize = async (parameters?: Action_callbacks & {}) => {
		const fullConfig = resolveConfig(tailwindConfig);

		const [sm, md, lg, xl] = [
			+(fullConfig.theme.screens.sm || '0px').replace('px', ''),
			+(fullConfig.theme.screens.md || '0px').replace('px', ''),
			+(fullConfig.theme.screens.lg || '0px').replace('px', ''),
			+(fullConfig.theme.screens.xl || '0px').replace('px', ''),
		];

		overWrite({ scope: 'responsiveSize', value: { sm, md, lg, xl } });
	};

	const setPlatform = async (parameters?: Action_callbacks & {}) => {
		if (typeof window === undefined || !('navigator' in window)) return;

		const userAgent = navigator.userAgent || '';
		const platform = (navigator as any).userAgentData?.platform || navigator.platform || '';

		const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
		const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
		const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

		let os: null | string = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'MacOS';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'IOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (/Linux/.test(platform)) {
			os = 'Linux';
		}

		overWrite({ scope: 'platform', value: { os } });
	};

	const setTheme = async (parameters: Action_callbacks & { theme: string }) => {
		const themes = ['dark', 'light'];
		const theme = parameters?.theme;

		if (!theme || !themes.includes(theme)) return console.log(`${theme} theme name invalid`);

		LocalStorageAPI.setItem('_theme', theme);
		document.querySelector('body')?.setAttribute('_theme', theme);

		overWrite({ scope: '', value: { theme } });
	};

	const setLanguage = async (parameters: Action_callbacks & { language: string }) => {
		const language = parameters?.language;

		if (!language || !Language.supportedList.find((item) => item.value === language))
			return console.log(`${language} language name invalid`);

		LocalStorageAPI.setItem('_language', language);
		document.querySelector('body')?.setAttribute('_language', language);

		overWrite({ scope: '', value: { language } });
	};

	//--------------------* End Action  *--------------------//

	return { setWindowSize, setResponsiveSize, setPlatform, setTheme, setLanguage };
};
