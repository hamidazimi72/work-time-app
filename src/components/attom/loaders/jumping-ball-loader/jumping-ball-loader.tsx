import { Block } from '@attom';

import CS from './jumping-ball-loader.module.scss';

export type JumpingBallLoaderProps = {
	boxProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const JumpingBallLoader: React.FC<JumpingBallLoaderProps> = ({ boxProps }) => {
	return (
		<Block boxProps={{ ...boxProps, className: `${boxProps?.className || ''} ${CS.container}` }}>
			<div className={CS.loader}>
				<div className={CS.loader__bar}></div>
				<div className={CS.loader__bar}></div>
				<div className={CS.loader__bar}></div>
				<div className={CS.loader__bar}></div>
				<div className={CS.loader__bar}></div>
				<div className={CS.loader__ball}></div>
			</div>
		</Block>
	);
};

export default JumpingBallLoader;
