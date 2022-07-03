/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Grid, Link, Tag, Text } from "@chakra-ui/react";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { parseProjectDate } from "../common/helpers";
import { getProjects } from "../common/queries";
import UnderlineHeader from "../components/UnderlineHeader";
import { Project } from "../types/project";

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	return (
		<Container maxW="container.xl" mb="5rem">
			<Head>
				<title>Angelin | Projects</title>
			</Head>
			<UnderlineHeader label="Projects" />
			<Flex flexDir="column" gap={10}>
				{projects.map((project, i) => (
					<Grid
						key={project.url}
						as="article"
						gridTemplateColumns="1fr 1fr"
						overflow="hidden"
						color="text"
						boxShadow="md"
						bgColor="gray.700"
						rounded="lg"
					>
						<Flex flexDir="column" p={10}>
							<Text fontSize="4xl">{project.title}</Text>
							<Text fontSize="sm" color="gray.400" mb={4}>
								Released {parseProjectDate(project.releaseDate)}
							</Text>
							<Flex flexWrap="wrap" gap={2} mb={8}>
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
								mt={4}
								sx={{ WebkitLineClamp: 8, WebkitBoxOrient: "vertical" }}
								display="-webkit-box"
								overflow="hidden"
								textOverflow="ellipsis"
								mb={10}
							>
								{project.description}
							</Text>
							<Flex mt="auto" gap={2}>
								<NextLink passHref href={project.url}>
									<Link isExternal _hover={{ textDecor: "none" }}>
										<Button variant="primary-icon">
											<ExternalLinkIcon mr={3} fontSize="xl" />
											View app
										</Button>
									</Link>
								</NextLink>
								<NextLink passHref href={`/projects/${project.slug}`}>
									<Button as={Link} variant="secondary-icon">
										Read more
									</Button>
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

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const fetcher = getProjects();
	const response = await fetcher();
	const data = await response.json();
	const projects: Project[] = data.items.map((project: any) => {
		const asset = data.includes.Asset.find((asset: any) => project.fields.previewImage.sys.id === asset.sys.id);
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
