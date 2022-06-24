import { getProjects } from "../common/queries";

export interface Technology {
	name: string;
	color: string;
	slug: string;
}

export interface Project {
	title: string;
	description: string;
	url: string;
	releaseDate: string;
	previewImage: string;
	technologies: Technology[];
}

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	console.log(projects);
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
