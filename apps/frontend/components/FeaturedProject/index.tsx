import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Project } from "../../types/project";
import NextImage from "next/image";
import NextLink from "next/link";
import { readableDate } from "../../common/helpers";

interface Props {
	project: Project;
}

export default function FeaturedProject({ project }: Props) {
	return (
		<NextLink passHref href={`/projects/${project.slug}`}>
			<Link
				color="text"
				display="flex"
				flexDir="column"
				boxShadow="md"
				bgColor="gray.700"
				rounded="lg"
				transitionDuration="0.5s"
				overflow="hidden"
				whiteSpace="break-spaces"
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
				<Flex p={10} flexDir="column">
					<Heading fontWeight={500} size="xl" noOfLines={1} mb={2}>
						{project.title}
					</Heading>
					<Text fontSize="sm" color="gray.200" lineHeight="6" mt={4} noOfLines={8}>
						{project.description}
					</Text>
					<Text fontSize="sm" color="gray.400" mt={8} fontWeight={500}>
						Released {readableDate(project.releaseDate)}
					</Text>
				</Flex>
			</Link>
		</NextLink>
	);
}
