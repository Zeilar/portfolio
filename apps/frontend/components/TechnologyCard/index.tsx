import { Icon, Link, Text } from "@chakra-ui/react";
import { Technology } from "../../types/technology";
import NextImage from "next/image";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
	technology: Technology;
}

export default function TechnologyCard({ technology }: Props) {
	return (
		<NextLink passHref href={technology.url}>
			<Link
				isExternal
				color="text"
				display="flex"
				flexDir="column"
				p={8}
				textAlign="center"
				boxShadow="md"
				bgColor="gray.700"
				rounded="lg"
				transitionDuration="0.5s"
				pos="relative"
				_hover={{
					transform: "scale(1.03)",
					bgColor: "gray.600",
					".chakra-icon": {
						color: "blue.500",
					},
				}}
			>
				<Icon as={ExternalLinkIcon} fontSize="2xl" color="gray.500" pos="absolute" right={2} top={2} />
				<NextImage
					style={{ filter: "drop-shadow(black 0px 1px 1px)", paddingBottom: 2, paddingTop: 2 }}
					src={technology.image}
					width={50}
					height={50}
				/>
				<Text fontSize="3xl" mt={6}>
					{technology.name}
				</Text>
				<Text
					fontSize="sm"
					color="gray.200"
					lineHeight="6"
					mt={2}
					sx={{ WebkitLineClamp: 8, WebkitBoxOrient: "vertical" }}
					display="-webkit-box"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					{technology.description}
				</Text>
			</Link>
		</NextLink>
	);
}
