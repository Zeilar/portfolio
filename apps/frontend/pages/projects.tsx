/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProjects } from "../common/queries";
import { Project } from "../types/project";

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	return <div>Projects</div>;
}

export async function getStaticProps() {
	const fetcher = getProjects();
	const response = await fetcher();
	const data = await response.json();
	const projects: Project[] = data.items.map((item: any) => ({
		...item.fields,
		technologies: data.includes.Entry.map((entry: any) => entry.fields),
		previewImage: data.includes.Asset[0].fields.file.url,
	}));
	return {
		props: {
			projects,
		},
	};
}
