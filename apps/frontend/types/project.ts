import { Technology } from "./technology";

export interface Project {
	title: string;
	description: string;
	url: string;
	releaseDate: string;
	previewImage: string;
	technologies: Technology[];
}
