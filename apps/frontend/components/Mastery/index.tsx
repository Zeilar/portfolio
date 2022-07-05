import { Box, Container, Text, useBreakpoint } from "@chakra-ui/react";
import { Technology } from "../../types/technology";
import UnderlineHeader from "../UnderlineHeader";
import Default from "./Default";
import Mobile from "./Mobile";

interface Props {
	technologies: Technology[];
}

export default function Mastery({ technologies }: Props) {
	const breakpoint = useBreakpoint({ ssr: true });
	return (
		<Box as="section" py={[6, "5rem"]}>
			<Container maxW="container.xl">
				<UnderlineHeader label="Mastery" />
				{breakpoint === "base" ? (
					<Mobile technologies={technologies} />
				) : (
					<Default technologies={technologies} />
				)}
				<Text mt={4} color="gray.200">
					...and much more
				</Text>
			</Container>
		</Box>
	);
}
