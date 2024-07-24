import React from 'react';

import { page_home } from '@context';

export type ComponentProps = {
	children?: any;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	children,
	//ui
	boxProps,
}) => {
	const { state, overWrite } = page_home.useContext();

	const {} = page_home.useActions();

	const changeStateScope = (values: Partial<typeof state> = {}) => overWrite({ scope: '', value: { ...values } });

	return (
		<div {...boxProps} className={`${boxProps?.className || ''}`}>
			Component
			{children}
		</div>
	);
};
