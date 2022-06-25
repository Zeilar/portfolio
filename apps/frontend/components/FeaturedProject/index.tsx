import { Flex, Link, Text } from "@chakra-ui/react";
import { Project } from "../../pages/projects";
import NextImage from "next/image";
import NextLink from "next/link";

interface Props {
	project: Project;
}

function parseDate(date: string) {
	const [month, , , , year] = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).formatToParts(new Date(date));
	return `${month.value} ${year.value}`;
}

export default function FeaturedProject({ project }: Props) {
	return (
		<NextLink passHref href={`/projects/${project.title}`}>
			<Link
				display="flex"
				flexDir="column"
				boxShadow="md"
				bgColor="gray.700"
				rounded="lg"
				transitionDuration="0.5s"
				_hover={{ transform: "scale(1.03)", bgColor: "gray.600" }}
			>
				<NextImage src={project.previewImage} width="100%" height="60rem" layout="responsive" />
				<Flex p={8} flexDir="column">
					<Text fontSize="4xl" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
						{project.title}
					</Text>
					<Text
						fontSize="sm"
						color="gray.200"
						lineHeight="6"
						mt={4}
						sx={{ "-webkit-line-clamp": "10", "-webkit-box-orient": "vertical" }}
						display="-webkit-box"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{project.description}
					</Text>
					<Text fontSize="sm" color="gray.400" mt={4}>
						{parseDate(project.releaseDate)}
					</Text>
				</Flex>
			</Link>
		</NextLink>
	);
}
