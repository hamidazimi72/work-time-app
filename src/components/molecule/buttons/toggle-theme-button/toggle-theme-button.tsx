import { Block } from '@attom';
import { icons } from '@data';
import { universal_app } from '@context';

import CS from './toggle-theme-button.module.scss';

type ToggleThemeButtonProps = {
	boxProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
	//
	boxProps,
}) => {
	const { state } = universal_app.useContext();
	const { theme } = state;

	const { setTheme } = universal_app.useActions();

	const toggleTheme = () => {
		const changedTo = (theme === 'dark' && 'light') || (theme === 'light' && 'dark') || '';
		setTheme({ theme: changedTo });
	};
	return (
		<Block boxProps={{ className: `${boxProps?.className || ''} ${CS.container}` }}>
			<span>شب</span>
			<div className={CS.toggleButton} data-theme={theme} onClick={toggleTheme}>
				<span className={CS.icon}>
					<img src={theme === 'dark' ? icons.moon.src : icons.sun.src} alt='icon' height={20} />
				</span>
			</div>
			<span>روز</span>
		</Block>
	);
};
