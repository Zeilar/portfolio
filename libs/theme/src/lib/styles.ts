export const styles = {
	global: {
		body: {
			bgColor: "gray.800",
			color: "text",
		},
		"#__next": {
			minH: "100vh",
			pt: 100,
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
