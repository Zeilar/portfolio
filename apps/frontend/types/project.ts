import { Technology } from "./technology";

export interface Project {
	title: string;
	slug: string;
	description: string;
	url: string;
	releaseDate: string;
	previewImage: {
		url: string;
		width: number;
		height: number;
	};
	technologies: Technology[];
}
