import React from 'react';

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
	return (
		<div {...boxProps} className={`${boxProps?.className || ''}`}>
			Component
			{children}
		</div>
	);
};
