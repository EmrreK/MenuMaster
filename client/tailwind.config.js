/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],

	daisyui: {
		themes: ["light", "dark", "cupcake"],
	},
};
