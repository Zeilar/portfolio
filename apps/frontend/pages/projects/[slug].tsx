/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Container, Flex, Link, Tag, Text } from "@chakra-ui/react";
import { getProject, getProjects } from "../../common/queries";
import UnderlineHeader from "../../components/UnderlineHeader";
import { Project } from "../../types/project";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { parseProjectDate } from "../../common/helpers";
import NextImage from "next/image";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
	project: Project;
}

export default function ProjectPage({ project }: Props) {
	const { back } = useRouter();
	return (
		<Container maxW="container.xl" as="article" mb="5rem">
			<Head>
				<title>{`Angelin | ${project.title}`}</title>
			</Head>
			<Flex justifyContent="space-between">
				<UnderlineHeader labelProps={{ fontSize: "6xl", lineHeight: 1.25, mb: 10 }} label={project.title} />
				<Flex gap={2} alignItems="flex-start">
					<Button variant="secondary-icon" onClick={back}>
						<ArrowBackIcon mr={3} fontSize="xl" />
						Back
					</Button>
					<NextLink passHref href={project.url}>
						<Link isExternal _hover={{ textDecor: "none" }}>
							<Button variant="primary-icon">
								<ExternalLinkIcon mr={3} fontSize="xl" />
								View app
							</Button>
						</Link>
					</NextLink>
				</Flex>
			</Flex>
			<Text mb={4} color="gray.400">
				Released {parseProjectDate(project.releaseDate)}
			</Text>
			<Box maxW="75%">
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
				<Text color="gray.200" mb={8}>
					{project.description}
				</Text>
			</Box>
			<NextImage
				src={project.previewImage.url}
				width={project.previewImage.width}
				height={project.previewImage.height}
			/>
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
