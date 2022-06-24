import { Box, Button, Container, Flex, Text, Link, Grid } from "@chakra-ui/react";
import avatar from "../assets/images/avatar.jpg";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProjects } from "../common/queries";
import { Project } from "./projects";
import FeaturedProject from "../components/FeaturedProject";

interface Props {
	featuredProjects: Project[];
}

export default function Index({ featuredProjects }: Props) {
	return (
		<Container display="flex" flexDir="column" maxW="container.xl">
			<Flex alignItems="center" justifyContent="space-between" pos="relative" minH="50rem">
				<Box
					as="svg"
					viewBox="0 0 550 600"
					h="85%"
					xmlns="http://www.w3.org/2000/svg"
					pos="absolute"
					zIndex={-1}
					userSelect="none"
				>
					<g>
						<text
							transform="matrix(3.45637 0 0 3.45637 -581.822 -189.709)"
							textAnchor="start"
							fontFamily="Inter"
							fontSize="242px"
							y="228.74254"
							x="161.54519"
							fill="var(--chakra-colors-purple-900)"
							opacity={0.2}
						>
							A
						</text>
					</g>
				</Box>
				<Box>
					<Text fontSize="6xl" lineHeight={1.25}>
						Idea in,
						<br />
						Application out.
					</Text>
					<Box as="hr" w="10rem" h={1} bgColor="accent" my={10} rounded="full" />
					<Text color="gray.400" lineHeight="7">
						Hi, I&apos;m Philip, a web developer from Sweden.
						<br />
						Professional nerd who loves to build cool things.
					</Text>
					<NextLink passHref href="/projects">
						<Button as={Link} mt={10}>
							Explore Projects
						</Button>
					</NextLink>
				</Box>
				<Flex
					display="inline-flex"
					rounded="100%"
					overflow="hidden"
					borderWidth={5}
					borderColor="accent"
					mx="auto"
				>
					<NextImage src={avatar} />
				</Flex>
			</Flex>
			<Text fontSize="5xl" mt={10}>
				Featured Projects
			</Text>
			<Box as="hr" w="10rem" h={1} bgColor="accent" mt={4} mb={10} rounded="full" />
			<Grid gridGap={8} gridTemplateColumns={["repeat(1, 1fr)", "repeat(auto-fit, 25rem)"]}>
				{featuredProjects.map(featuredProject => (
					<FeaturedProject key={featuredProject.url} project={featuredProject} />
				))}
			</Grid>
		</Container>
	);
}

export async function getStaticProps() {
	const fetcher = getProjects(true);
	const response = await fetcher();
	const data = await response.json();
	const featuredProjects: Project[] = data.items.map((item: any) => ({
		...item.fields,
		technologies: data.includes.Entry.map((entry: any) => entry.fields),
		previewImage: `https:${data.includes.Asset[0].fields.file.url}`,
	}));
	return {
		props: {
			featuredProjects,
		},
	};
}
