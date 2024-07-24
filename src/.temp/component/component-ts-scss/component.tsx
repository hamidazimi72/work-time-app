import React from 'react';

import CS from './component.module.scss';

export type ComponentProps = {
	children?: React.JSX.Element[] | null;
	// ui
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Component: React.FC<ComponentProps> = ({
	children,
	//ui
	boxProps,
}) => {
	return (
		<div {...boxProps} className={`${CS.container} ${boxProps?.className || ''}`}>
			Component
			{children}
		</div>
	);
};
