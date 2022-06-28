import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Project } from "../../types/project";
import NextImage from "next/image";
import NextLink from "next/link";
import { parseProjectDate } from "../../common/helpers";

interface Props {
	project: Project;
}

export default function FeaturedProject({ project }: Props) {
	return (
		<NextLink passHref href={`/projects/${project.slug}`}>
			<Link
				display="flex"
				flexDir="column"
				boxShadow="md"
				bgColor="gray.700"
				rounded="lg"
				transitionDuration="0.5s"
				overflow="hidden"
				_hover={{ transform: "scale(1.03)", bgColor: "gray.600" }}
			>
				<Flex h={300} overflow="hidden" justifyContent="center">
					<NextImage
						src={project.previewImage.url}
						width={project.previewImage.width}
						height={project.previewImage.height}
						objectFit="cover"
					/>
				</Flex>
				<Flex p={8} flexDir="column">
					<Text fontSize="4xl" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
						{project.title}
					</Text>
					<Text
						fontSize="sm"
						color="gray.200"
						lineHeight="6"
						mt={4}
						sx={{ WebkitLineClamp: 8, WebkitBoxOrient: "vertical" }}
						display="-webkit-box"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{project.description}
					</Text>
					<Text fontSize="sm" color="gray.400" mt={8}>
						{parseProjectDate(project.releaseDate)}
					</Text>
				</Flex>
			</Link>
		</NextLink>
	);
}
