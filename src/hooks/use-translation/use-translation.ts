import { Language } from '@models';
import { universal_app } from '@context';

export const useTranslation = () => {
	const { state } = universal_app.useContext();
	const { language } = state;

	const t = (content = '') => {
		const translateFile = Language.supported[language]?.translateFile;
		if (translateFile && translateFile[content]) return translateFile[content];
		return content;
	};

	return { t };
};
