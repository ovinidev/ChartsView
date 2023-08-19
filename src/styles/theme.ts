import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		primary: "#1E3A8A",
	},

	breakpoints: {
		sm: "18.75rem", // 300px
		md: "25rem", // 400px
		lg: "31.25rem", // 500px
		xl: "37.5rem", // 600px
		"2xl": "43.75rem", // 700px
		"3xl": "50rem", // 800px
		"4xl": "56.25rem", // 900px
		"5xl": "62.5rem", // 1000px
		"6xl": "68.75rem", // 1100px
		"7xl": "75rem", // 1200px
		"8xl": "81.25rem", // 1300px
		"9xl": "87.5rem", // 1400px
		"10xl": "120rem", // 1920px
	},

	fonts: {
		body: "Roboto",
		heading: "Roboto",
	},

	fontSizes: {
		"10": "0.625rem", // 10px
		"12": "0.75rem", // 12px
		"14": "0.875rem", // 14px
		"16": "1rem", // 16px
		"18": "1.125rem", // 18px
		"20": "1.25rem", // 20px
		"22": "1.375rem", // 22px
		"24": "1.5rem", // 24px
		"26": "1.625rem", // 26px
		"28": "1.75", // 28px
		"30": "1.875rem", // 30px
		"32": "2rem", // 32px
		"34": "2.125rem", // 34px
		"36": "2.25rem", // 36px
	},

	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},

	components: {
		Drawer: {
			sizes: {
				...chakraTheme.components.Drawer.sizes,
				xs: { dialog: { maxW: "450px" } },
			},
		},
	},

	styles: {
		global: {
			body: {
				color: "gray.900",
			},
		},
	},
});
