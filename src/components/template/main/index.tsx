import { useRouter } from 'next/router';

import { PageLoader } from '@attom';
import { template_main } from '@context';

import { Render } from './render';

export const MainTemplate = ({ children }) => {
	// const { allow } = useAccessibility(['A', 'S', 'U'], {});
	const allow = true;

	const router = useRouter();

	return <template_main.Provider>{allow === true ? <Render>{children}</Render> : <PageLoader />} </template_main.Provider>;
};

export default MainTemplate;
