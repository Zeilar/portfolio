/* eslint-disable @typescript-eslint/no-explicit-any */

import { CloseIcon, ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Grid, IconButton, Link, Tag, Text, Tooltip, useTheme } from "@chakra-ui/react";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, parseProjectDate } from "../common/helpers";
import { getProjects } from "../common/queries";
import UnderlineHeader from "../components/UnderlineHeader";
import { Project } from "../types/project";

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	const [isReaderMode, setIsReaderMode] = useState(false);
	const [readerIndex, setReaderIndex] = useState(0);

	const articlesRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	const readerUp = useCallback(() => {
		setReaderIndex(p => clamp(p - 1, 0, projects.length - 1));
	}, [projects.length]);

	const readerDown = useCallback(() => {
		setReaderIndex(p => clamp(p + 1, 0, projects.length - 1));
	}, [projects.length]);

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			switch (e.key) {
				case "r":
					setIsReaderMode(p => !p);
					break;
				case "Escape":
					setIsReaderMode(false);
					break;
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (!isReaderMode) {
				return;
			}
			e.preventDefault();
			switch (e.key) {
				case "Escape":
					setIsReaderMode(false);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					readerUp();
					break;
				case "ArrowRight":
				case "ArrowDown":
					readerDown();
					break;
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [isReaderMode, projects.length, readerUp, readerDown]);

	useEffect(() => {
		if (!articlesRef.current) {
			return;
		}
		const { offsetTop, offsetHeight } = articlesRef.current.querySelectorAll("article")[readerIndex];
		window.scrollTo({ top: offsetTop - offsetHeight / 2, behavior: "smooth" });
	}, [readerIndex]);

	return (
		<Container maxW="container.xl" mb="5rem">
			<Head>
				<title>Angelin | Projects</title>
			</Head>
			<UnderlineHeader label="Projects" />
			<Flex flexDir="column" gap={10} ref={articlesRef}>
				{isReaderMode && (
					<Box
						pos="fixed"
						inset={0}
						w="100%"
						h="100%"
						boxShadow={`0 0 0 100vmax inset ${theme.colors.blackAlpha[600]}`}
						zIndex={100}
					/>
				)}
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
						zIndex={isReaderMode && i === readerIndex ? 110 : undefined}
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
			<Tooltip label={isReaderMode ? "Close reader" : "Open reader"} closeOnClick={false} placement="left">
				<IconButton
					display={{ base: "none", desktop: "inline-flex" }}
					aria-label="Toggle reader"
					variant={isReaderMode ? "secondary" : "primary"}
					pos="fixed"
					boxShadow="md"
					transform="translateY(-50%)"
					top="50%"
					right={4}
					size="lg"
					onClick={() => setIsReaderMode(p => !p)}
					zIndex={10}
					_focusVisible={{ outline: 0 }}
				>
					{isReaderMode ? <CloseIcon /> : <SearchIcon />}
				</IconButton>
			</Tooltip>
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
