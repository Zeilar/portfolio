/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Container, Flex, Text, Link, Grid, Textarea, Input } from "@chakra-ui/react";
import avatar from "../assets/images/avatar.jpg";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProjects, getTechnologies } from "../common/queries";
import FeaturedProject from "../components/FeaturedProject";
import theme from "@theme";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import UnderlineHeader from "../components/UnderlineHeader";
import TechnologyCard from "../components/TechnologyCard";
import { Project } from "../types/project";
import { Technology } from "../types/technology";

interface Props {
	featuredProjects: Project[];
	technologies: Technology[];
}

export default function Index({ featuredProjects, technologies }: Props) {
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
						<Text color="gray.200" lineHeight="7">
							Hi, I&apos;m Philip, a web developer from Sweden.
							<br />
							Professional nerd who loves to build cool things.
						</Text>
						<NextLink passHref href="/projects">
							<Button as={Link} mt={4} variant="primary-link">
								Explore Projects
								<ArrowForwardIcon />
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
			<Container as="section" maxW="container.xl" py="5rem">
				<Flex justifyContent="space-between" alignItems="center">
					<UnderlineHeader label="Featured Projects" />
					<NextLink href="/projects" passHref>
						<Button as={Link} variant="primary-link">
							All Projects
							<ArrowForwardIcon />
						</Button>
					</NextLink>
				</Flex>
				<Grid gridGap={8} gridTemplateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
					{featuredProjects.map(featuredProject => (
						<FeaturedProject key={featuredProject.url} project={featuredProject} />
					))}
				</Grid>
			</Container>
			<Box as="section" bgColor="gray.700" py="5rem">
				<Container maxW="container.xl">
					<UnderlineHeader label="About me" />
					<Flex gap={8}>
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
			<Box as="section" py="5rem">
				<Container maxW="container.xl">
					<UnderlineHeader label="Mastery" />
					<Grid gridGap={8} gridTemplateColumns="repeat(4, 1fr)">
						{technologies.map(technology => (
							<TechnologyCard key={technology.description} technology={technology} />
						))}
					</Grid>
					<Text mt={4} color="gray.200">
						...and much more
					</Text>
				</Container>
			</Box>
			<Box as="section" py="5rem" bgColor="gray.700">
				<Container maxW="container.xl">
					<UnderlineHeader label="Contact" />
					<Input variant="filled" />
					<Textarea variant="filled" value="hello" onChange={e => e} />
				</Container>
			</Box>
		</>
	);
}

export async function getStaticProps() {
	const projectsFetcher = getProjects(true);
	const projectsResponse = await projectsFetcher();
	const projectsData = await projectsResponse.json();
	const featuredProjects: Project[] = projectsData.items.map((item: any) => {
		const asset = projectsData.includes.Asset.find(
			(asset: any) => item.fields.previewImage.sys.id === asset.sys.id
		);
		return {
			...item.fields,
			previewImage: {
				url: `https:${asset.fields.file.url}`,
				width: asset.fields.file.details.image.width,
				height: asset.fields.file.details.image.height,
			},
		};
	});

	const technologiesFetcher = getTechnologies();
	const technologiesResponse = await technologiesFetcher();
	const technologiesData = await technologiesResponse.json();
	const technologies: Technology[] = technologiesData.items.map((item: any) => {
		const asset = technologiesData.includes.Asset.find((asset: any) => item.fields.image.sys.id === asset.sys.id);
		return {
			...item.fields,
			image: `https:${asset.fields.file.url}`,
		};
	});

	return {
		props: {
			featuredProjects,
			technologies,
		},
	};
}
