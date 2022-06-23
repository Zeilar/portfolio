export const styles = {
	global: {
		body: {
			bgColor: "gray.800",
			color: "text",
		},
		"#root": {
			minH: "100vh",
		},
		"::selection": {
			bgColor: "purple.900",
		},
		"*, *::before, *::after": {
			borderColor: "border",
			listStyleType: "none",
		},
	},
};
