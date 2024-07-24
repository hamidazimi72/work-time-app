import fa from '@assets/svg/country/iran.svg';
import en from '@assets/svg/country/english.svg';

import enLocale from '@assets/locales/en/common.json';
import faLocale from '@assets/locales/en/common.json';

export class Language {
	static supported = {
		fa: {
			value: 'fa',
			name: 'فارسی',
			faName: 'فارسی',
			enName: 'Persian',
			translateFile: faLocale,
			img: fa,
		},
		en: {
			value: 'en',
			name: 'English',
			faName: 'انگلیسی',
			enName: 'English',
			translateFile: enLocale,
			img: en,
		},
	};

	static supportedList = [
		{
			value: 'fa',
			name: 'فارسی',
			faName: 'فارسی',
			enName: 'Persian',
			img: fa,
		},
		{
			value: 'en',
			name: 'English',
			faName: 'انگلیسی',
			enName: 'English',
			img: en,
		},
	];
}
