const ACCESS_TOKEN = process.env.NX_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NX_CONTENTFUL_SPACE_ID;

export function getProjects(featured = false) {
	return () => {
		const params = new URLSearchParams({
			content_type: "project",
			include: "1",
			"fields.featured": String(featured),
		});
		return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	};
}
