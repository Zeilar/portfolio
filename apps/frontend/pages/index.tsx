/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Container, Flex, Text, Link, Grid, Icon, useBreakpoint } from "@chakra-ui/react";
import avatar from "../assets/images/avatar.jpg";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProjects, getTechnologies } from "../common/queries";
import FeaturedProject from "../components/FeaturedProject";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import UnderlineHeader from "../components/UnderlineHeader";
import { Project } from "../types/project";
import { Technology } from "../types/technology";
import { ReactComponent as BrandIcon } from "../assets/svgs/brand.svg";
import angelinOg from "../assets/images/angelin-og.png";
import { GetServerSidePropsResult } from "next";
import Contact from "../components/Contact";
import Head from "next/head";

interface Props {
	featuredProjects: Project[];
}

export default function Index({ featuredProjects }: Props) {
	const breakpoint = useBreakpoint();
	return (
		<>
			<Container as="section" maxW="container.xl">
				<Head>
					<title>Angelin</title>
					<meta property="og:title" content="Home" />
					<meta property="og:image" content={angelinOg.src} />
					<meta property="og:url" content="https://angelin.dev" />
					<meta
						property="og:description"
						content="Come on in and explore my corner of the web! Here you will find my portfolio and learn about who I am and what I do."
					/>
					<meta property="og:site_name" content="Angelin" />
				</Head>
				<Flex alignItems="center" justifyContent="space-between" minH={[null, "50rem"]}>
					<Box>
						<UnderlineHeader
							labelProps={{ fontSize: ["4xl", "6xl"], lineHeight: 1.25, mb: [5, 10] }}
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
					<Icon display={["none", "block"]} as={BrandIcon} w="30rem" h="auto" mx="auto" />
				</Flex>
			</Container>
			<Container as="section" maxW="container.xl" py={[6, "5rem"]}>
				<Flex justifyContent="space-between">
					<UnderlineHeader label="Featured Projects" />
					{breakpoint !== "base" && (
						<NextLink href="/projects" passHref>
							<Button as={Link} variant="primary-link">
								All Projects
								<ArrowForwardIcon />
							</Button>
						</NextLink>
					)}
				</Flex>
				<Grid gridGap={8} gridTemplateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
					{featuredProjects.map(featuredProject => (
						<FeaturedProject key={featuredProject.url} project={featuredProject} />
					))}
					{breakpoint === "base" && (
						<NextLink href="/projects" passHref>
							<Button as={Link} variant="primary-link">
								All Projects
								<ArrowForwardIcon />
							</Button>
						</NextLink>
					)}
				</Grid>
			</Container>
			<Box as="section" bgColor="gray.700" py={[6, "5rem"]}>
				<Container maxW="container.xl">
					<UnderlineHeader label="About me" />
					<Flex gap={[4, 8]} flexDir={["column", "row"]}>
						<Flex rounded="lg" overflow="hidden">
							<NextImage width={200} height={200} objectFit="cover" src={avatar} />
						</Flex>
						<Text color="gray.200" maxW={["auto", "50%"]}>
							My journey as a developer started in high school where I studied game development, where we
							coded primarily in C# and the framework&nbsp;
							<NextLink passHref href="https://www.microsoft.com/en-us/download/details.aspx?id=23714">
								<Link isExternal>XNA</Link>
							</NextLink>
							. I migrated towards web development instead and after two 2-year educations which included
							a lot of internship, I was more than ready to become a professional.
							<br />
							<br />
							Most of my spare time goes towards the computer. Be it programming, gaming or watching
							videos. You may call me a <i>supernerd</i>. Shoutout to&nbsp;
							<NextLink passHref href="https://www.coffeestainstudios.com/">
								<Link isExternal>Coffe Stain Studios</Link>
							</NextLink>
							.
						</Text>
					</Flex>
				</Container>
			</Box>
			<Contact />
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
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

	return {
		props: {
			featuredProjects,
		},
	};
}
