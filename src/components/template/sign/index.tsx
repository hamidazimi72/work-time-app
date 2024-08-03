// import { PageLoader } from '@attom';
import { template_dashboard } from '@context';

import { Render } from './render';

export const SignTemplate = ({ children }) => {
	return (
		<template_dashboard.Provider>
			<Render>{children}</Render>
		</template_dashboard.Provider>
	);
};

export default SignTemplate;
