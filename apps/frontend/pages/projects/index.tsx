/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Grid, Heading, Link, Tag, Text, useBreakpoint } from "@chakra-ui/react";
import { Asset } from "../../types/asset";
import { GetServerSidePropsResult } from "next";
import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { readableDate } from "../../common/helpers";
import { getProjects } from "../../common/queries";
import UnderlineHeader from "../../components/UnderlineHeader";
import { Project } from "../../types/project";

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	const breakpoint = useBreakpoint({ ssr: true });
	return (
		<Container maxW="container.xl" mb={[6, "5rem"]}>
			<Head>
				<title>Angelin | Projects</title>
				<meta property="og:title" content="Projects" />
				<meta property="og:url" content="https://angelin.dev/projects" />
				<meta property="og:site_name" content="Angelin" />
			</Head>
			<UnderlineHeader label="Projects" />
			<Flex flexDir="column" gap={[6, 10]}>
				{projects.map((project, i) => (
					<Grid
						key={project.url}
						as="article"
						gridTemplateColumns={["1fr", "1fr 1fr"]}
						overflow="hidden"
						color="text"
						boxShadow="md"
						bgColor="gray.700"
						rounded="lg"
					>
						<Flex flexDir="column" p={[6, 10]} order={[1, 0]}>
							<Heading fontWeight={500} size="xl" mb={2}>
								{project.title}
							</Heading>
							<Text fontSize="sm" color="gray.400" mb={4} fontWeight={500}>
								Released {readableDate(project.releaseDate)}
							</Text>
							<Flex flexWrap="wrap" gap={2} mb={[2, 8]}>
								{project.technologies.map(technology => (
									<Tag
										key={technology.name}
										fontFamily="Jetbrains Mono"
										rounded="lg"
										fontSize="xs"
										letterSpacing={1}
										bgColor="accent"
										color="text"
									>
										{technology.name}
									</Tag>
								))}
							</Flex>
							<Text
								fontSize="sm"
								color="gray.200"
								lineHeight="6"
								whiteSpace="break-spaces"
								mt={4}
								sx={{ WebkitLineClamp: 8, WebkitBoxOrient: "vertical" }}
								display="-webkit-box"
								overflow="hidden"
								textOverflow="ellipsis"
								mb={[6, 10]}
							>
								{project.description}
							</Text>
							<Flex mt="auto" gap={4} alignItems="center" flexDir={["column", "row"]}>
								<NextLink passHref href={project.url}>
									<Link isExternal width={["100%", "auto"]} _hover={{ textDecor: "none" }}>
										<Button variant="primary-icon" width={["100%", "auto"]}>
											<ExternalLinkIcon mr={3} fontSize="xl" />
											View app
										</Button>
									</Link>
								</NextLink>
								<NextLink passHref href={`/projects/${project.slug}`}>
									{breakpoint === "base" ? (
										<Button py={6} as={Link} variant="secondary" w="100%">
											Read more
										</Button>
									) : (
										<Link paddingInline={4} color="text" textAlign="center">
											Read more
										</Link>
									)}
								</NextLink>
							</Flex>
						</Flex>
						<NextImage
							src={project.previewImage.url}
							width={project.previewImage.width}
							height={project.previewImage.height}
							objectFit="cover"
						/>
					</Grid>
				))}
			</Flex>
		</Container>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
	const fetcher = getProjects();
	const response = await fetcher();
	const data = await response.json();
	const projects: Project[] = data.items.map((project: any) => {
		const asset = data.includes.Asset.find((asset: Asset) => project.fields.previewImage.sys.id === asset.sys.id);
		const technologies = project.fields.technologies.map(
			(technology: any) => data.includes.Entry.find((entry: any) => technology.sys.id === entry.sys.id).fields
		);
		return {
			...project.fields,
			technologies,
			previewImage: {
				url: `https:${asset.fields.file.url}`,
				width: asset.fields.file.details.image.width,
				height: asset.fields.file.details.image.height,
			},
		};
	});
	return {
		props: {
			projects,
		},
	};
}
