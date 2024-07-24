import { PrimaryCard } from '@attom';

import CS from './component.module.scss';

export const Component = ({
	// box Control
	boxProps,
}) => {
	return (
		<PrimaryCard boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container}` }} rounded>
			Component
		</PrimaryCard>
	);
};

export default Component;
