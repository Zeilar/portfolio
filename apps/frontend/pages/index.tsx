import { Box, Button, Container, Flex, Text, Link, Grid } from "@chakra-ui/react";
import avatar from "../assets/images/avatar.jpg";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProjects } from "../common/queries";
import { Project } from "./projects";
import FeaturedProject from "../components/FeaturedProject";
import theme from "@theme";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import UnderlineHeader from "../components/UnderlineHeader";

interface Props {
	featuredProjects: Project[];
}

export default function Index({ featuredProjects }: Props) {
	return (
		<>
			<Container as="section" maxW="container.xl">
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
								fill={theme.colors.purple[900]}
								opacity={0.2}
							>
								A
							</text>
						</g>
					</Box>
					<Box>
						<UnderlineHeader
							labelProps={{ fontSize: "6xl", lineHeight: 1.25, mb: 10 }}
							label={
								<>
									Idea in,
									<br />
									Application out.
								</>
							}
						/>
						<Text color="gray.200" lineHeight="7" mt={10}>
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
			</Container>
			<Container as="section" maxW="container.xl">
				<Flex justifyContent="space-between" alignItems="center" my={10}>
					<UnderlineHeader label="Featured Projects" />
					<NextLink href="/projects" passHref>
						<Button as={Link}>
							All Projects
							<ArrowForwardIcon ml={2} />
						</Button>
					</NextLink>
				</Flex>
				<Grid gridGap={8} gridTemplateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
					{featuredProjects.map(featuredProject => (
						<FeaturedProject key={featuredProject.url} project={featuredProject} />
					))}
				</Grid>
			</Container>
			<Box as="section" bgColor="gray.700" py="5rem" mt="5rem">
				<Container maxW="container.xl">
					<UnderlineHeader label="About me" />
					<Flex gap={8} mt={10}>
						<Flex rounded="lg" overflow="hidden">
							<NextImage width={200} height={200} objectFit="cover" src={avatar} />
						</Flex>
						<Text color="gray.200" maxW="67%">
							During my apprenticeship as a media designer I have developed my passion for programming.
							Since then, about five years ago, I have been working on a multitude of different projects
							fulltime at an agency and as a freelancer. While I focus on creating secure, performant and
							accessible websites and apps, I believe a clear design language is as important to provide a
							great user experience. In order to accomplish that I enjoy constantly challenging myself to
							learn new technologies and tools.
						</Text>
					</Flex>
				</Container>
			</Box>
		</>
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
