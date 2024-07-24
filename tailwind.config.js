module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		extend: {
			colors: {
				// _____________________* basic main colors *_____________________ //
				'primary-1': 'var(--color-primary-1)',
				'primary-2': 'var(--color-primary-2)',
				'secondary-1': 'var(--color-secondary-1)',
				'tertiary-1': 'var(--color-tertiary-1)',
				// _____________________* custom main colors *_____________________ //
				success: 'var(--color-success)',
				danger: 'var(--color-danger)',
				warning: 'var(--color-warning)',
				info: 'var(--color-info)',
				cancel: 'var(--color-cancel)',
				// _____________________* text & bg colors *_____________________ //
				'background-primary': 'var(--color-background-primary)',
				'background-secondary': 'var(--color-background-secondary)',
				'background-tertiary': 'var(--color-background-tertiary)',
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-tertiary': 'var(--color-text-tertiary)',
			},
		},
		fontFamily: {
			iransans: ['iransans', 'inherit'],
			iranyekan: ['iranyekan', 'inherit'],
			vazir: ['vazir', 'inherit'],
			lora: ['lora', 'inherit'],
			crea: ['crea', 'inherit'],
		},
	},
	plugins: [],
};
