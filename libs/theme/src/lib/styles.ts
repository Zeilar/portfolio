export const styles = {
	global: {
		body: {
			color: "text",
		},
		"#__next": {
			minH: "100vh",
			pt: [125, 200],
		},
		"::selection": {
			bgColor: "blackAlpha.700",
			color: "accent",
		},
		"*, *::before, *::after": {
			borderColor: "border",
			listStyleType: "none",
		},
		"svg, img": {
			userSelect: "none",
		},
	},
};
