export const styles = {
	global: {
		body: {
			color: "text",
		},
		"#__next": {
			minH: "100vh",
			pt: 200,
		},
		"::selection": {
			bgColor: "purple.900",
			color: "text",
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
