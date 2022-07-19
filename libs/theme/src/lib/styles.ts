export const styles = {
	global: {
		body: {
			color: "text",
		},
		"#__next": {
			minH: "100vh",
			pt: [125, 200],
			display: "flex",
			flexDir: "column",
		},
		"::selection": {
			bgColor: "blackAlpha.700",
			color: "accent",
		},
		"*, *::before, *::after": {
			borderColor: "border",
		},
		"ul:not([role=list]), ul:not([role=list])": {
			listStyleType: "none",
		},
		"svg, img": {
			userSelect: "none",
		},
	},
};
