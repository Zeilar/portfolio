const ACCESS_TOKEN = process.env.NX_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NX_CONTENTFUL_SPACE_ID;

export function getProject(slug: string) {
	return () => {
		const params = new URLSearchParams({
			content_type: "project",
			include: "1",
			"fields.slug": slug,
		});
		return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	};
}

export function getProjects(featured = false) {
	return () => {
		const params = new URLSearchParams({
			content_type: "project",
			include: "1",
		});
		if (featured) {
			params.append("fields.featured", "true");
		}
		return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	};
}

export function getTechnologies() {
	return () => {
		const params = new URLSearchParams({
			content_type: "technology",
			include: "1",
		});
		return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	};
}

export function getPosts() {
	return () => {
		const params = new URLSearchParams({
			content_type: "post",
			include: "1",
		});
		return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	};
}
