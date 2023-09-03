/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: {
			  DEFAULT: {
				css: {
				  a: {
					textDecoration: "none",
					borderBotom: 4,
					fontWeight: "bold",
				  },
				},
			  },
			},
		  },
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
