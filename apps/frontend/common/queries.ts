/* eslint-disable @typescript-eslint/no-explicit-any */

import { Asset } from "../types/asset";
import { Entry } from "../types/entry";
import { Post } from "../types/post";

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

export async function getPosts(search = ""): Promise<{ posts: Post[]; assets: any[] }> {
	const params = new URLSearchParams({
		content_type: "post",
		include: "1",
		"fields.title[match]": search,
	});
	const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${ACCESS_TOKEN}`,
		},
	});
	const data = await response.json();
	const posts = data.items.map((project: any) => {
		const asset = data.includes.Asset.find((asset: any) => project.fields.previewImage.sys.id === asset.sys.id);
		return {
			...project.fields,
			previewImage: `https:${asset.fields.file.url}`,
		};
	});
	return {
		posts,
		assets: data.includes?.Asset ?? null,
	};
}

export async function getPost(slug: string) {
	const params = new URLSearchParams({
		content_type: "post",
		include: "1",
		"fields.slug[match]": slug,
	});
	const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${ACCESS_TOKEN}`,
		},
	});
	const data = await response.json();
	const posts: Post[] = data.items.map((project: any) => {
		const asset = data.includes.Asset.find((asset: any) => project.fields.previewImage.sys.id === asset.sys.id);
		return {
			...project.fields,
			previewImage: `https:${asset.fields.file.url}`,
		};
	});
	return {
		post: posts[0],
		assets: data.includes.Asset as Asset[],
		entries: data.includes.Entry as Entry[],
	};
}
