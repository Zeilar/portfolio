/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Container, Flex, Tag, Text, useBreakpoint } from "@chakra-ui/react";
import { getProject } from "../../../common/queries";
import UnderlineHeader from "../../../components/UnderlineHeader";
import { Project } from "../../../types/project";
import { GetServerSidePropsResult, GetStaticPropsContext } from "next";
import { readableDate } from "../../../common/helpers";
import NextImage from "next/image";
import Head from "next/head";
import ProjectNavigation from "../../../components/ProjectNavigation";

interface Props {
	project: Project;
}

export default function ProjectPage({ project }: Props) {
	const breakpoint = useBreakpoint({ ssr: true });
	return (
		<Container maxW="container.xl" as="article" mb={[6, "5rem"]}>
			<Head>
				<title>{`Angelin | ${project.title}`}</title>
				<meta property="og:title" content={project.title} />
				<meta property="og:image" content={project.previewImage.url} />
				<meta property="og:url" content={`https://angelin.dev/projects/${project.slug}`} />
				<meta property="og:description" content={project.description} />
				<meta property="og:site_name" content="Angelin" />
			</Head>
			<Flex justifyContent="space-between">
				<UnderlineHeader labelProps={{ fontSize: "6xl", lineHeight: 1.25, mb: 10 }} label={project.title} />
				{breakpoint !== "base" && <ProjectNavigation url={project.url} />}
			</Flex>
			<Text mb={4} color="gray.400" fontWeight={500}>
				Released {readableDate(project.releaseDate)}
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
						objectFit="cover"
					/>
				)}
				<Text color="gray.200" mb={8} mt={[2, 0]} whiteSpace="break-spaces">
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

export async function getServerSideProps(
	ctx: GetStaticPropsContext<{ slug: string }>
): Promise<GetServerSidePropsResult<Props>> {
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
