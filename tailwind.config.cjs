const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'primary': {
					light: '#a0b479',
					DEFAULT: '#739244',
					dark: '#5f7938',
				},
				'offwhite': {
					light: '#fefbf6',
					DEFAULT: '#efebce',
					formfield: '#e3e9e0',
				},
				'accent': {
					red: '#ff595e',
					yellow: '#ffca3a',
					green: '#8ac926',
					blue: '#1982c4',
					purple: '#6a4c93',
				},
				'formbg': {
					DEFAULT: '#E3E9E0;'
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
