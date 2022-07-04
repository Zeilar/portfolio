import { Grid } from "@chakra-ui/react";
import { Technology } from "apps/frontend/types/technology";
import TechnologyCard from "../TechnologyCard";

interface Props {
	technologies: Technology[];
}

export default function Default({ technologies }: Props) {
	return (
		<Grid gridGap={8} gridTemplateColumns="repeat(4, 1fr)">
			{technologies.map(technology => (
				<TechnologyCard key={technology.description} technology={technology} />
			))}
		</Grid>
	);
}
