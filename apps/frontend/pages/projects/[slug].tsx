/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Container, Flex, Tag, Text, useBreakpoint } from "@chakra-ui/react";
import { getProject, getProjects } from "../../common/queries";
import UnderlineHeader from "../../components/UnderlineHeader";
import { Project } from "../../types/project";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { parseProjectDate } from "../../common/helpers";
import NextImage from "next/image";
import Head from "next/head";
import ProjectNavigation from "../../components/ProjectNavigation";

interface Props {
	project: Project;
}

export default function ProjectPage({ project }: Props) {
	const breakpoint = useBreakpoint({ ssr: true });
	return (
		<Container maxW="container.xl" as="article" mb={[6, "5rem"]}>
			<Head>
				<title>{`Angelin | ${project.title}`}</title>
			</Head>
			<Flex justifyContent="space-between">
				<UnderlineHeader labelProps={{ fontSize: "6xl", lineHeight: 1.25, mb: 10 }} label={project.title} />
				{breakpoint !== "base" && <ProjectNavigation url={project.url} />}
			</Flex>
			<Text mb={4} color="gray.400">
				Released {parseProjectDate(project.releaseDate)}
			</Text>
			<Box maxW={["unset", "75%"]}>
				<Flex flexWrap="wrap" gap={2} mb={8}>
					{project.technologies.map(technology => (
						<Tag
							fontFamily="Jetbrains Mono"
							rounded="lg"
							fontSize="xs"
							letterSpacing={1}
							bgColor="accent"
							color="text"
							key={technology.name}
						>
							{technology.name}
						</Tag>
					))}
				</Flex>
				{breakpoint === "base" && (
					<NextImage
						src={project.previewImage.url}
						width={project.previewImage.width}
						height={project.previewImage.height}
					/>
				)}
				<Text color="gray.200" mb={8} mt={[2, 0]}>
					{project.description}
				</Text>
			</Box>
			{breakpoint === "base" && <ProjectNavigation url={project.url} />}
			{breakpoint !== "base" && (
				<NextImage
					src={project.previewImage.url}
					width={project.previewImage.width}
					height={project.previewImage.height}
				/>
			)}
		</Container>
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
	const fetcher = getProjects(true);
	const response = await fetcher();
	const data = await response.json();
	return {
		paths: data.items.map((project: any) => ({
			params: {
				slug: project.fields.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps(
	ctx: GetStaticPropsContext<{ slug: string }>
): Promise<GetStaticPropsResult<Props>> {
	const fetcher = getProject(ctx.params.slug);
	const response = await fetcher();
	const data = await response.json();
	const project = data.items[0];
	const asset = data.includes.Asset.find((asset: any) => project.fields.previewImage.sys.id === asset.sys.id);
	return {
		props: {
			project: {
				...project.fields,
				technologies: data.includes.Entry.map(({ fields }) => ({
					name: fields.name,
					color: fields.color,
				})),
				previewImage: {
					url: `https:${asset.fields.file.url}`,
					width: asset.fields.file.details.image.width,
					height: asset.fields.file.details.image.height,
				},
			},
		},
	};
}
