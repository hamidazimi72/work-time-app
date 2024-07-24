import React from 'react';

export type BlockProps = {
	children?: any;
	//
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const Block: React.FC<BlockProps> = ({
	children,
	//
	boxProps,
}) => {
	return (
		<div {...boxProps} className={`${boxProps?.className || ''}`}>
			{children}
		</div>
	);
};

export default Block;
