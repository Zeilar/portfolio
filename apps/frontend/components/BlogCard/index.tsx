import { Box, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react";
import { readableDate } from "../../common/helpers";
import NextImage from "next/image";
import NextLink from "next/link";

interface Props {
	title: string;
	tags?: string[];
	publishedAt: string;
	minutes: number;
	previewImage?: string;
	slug: string;
}

export default function BlogCard({ previewImage, minutes, title, tags, publishedAt, slug }: Props) {
	return (
		<NextLink passHref href={`/blog/${slug}`}>
			<Link
				color="text"
				display="flex"
				flexDir="column"
				boxShadow="md"
				bgColor="gray.700"
				rounded="lg"
				transitionDuration="0.5s"
				overflow="hidden"
				_hover={{ bgColor: "gray.600" }}
			>
				<Flex as="article" p={6} alignItems="flex-start">
					<Box flexGrow={1}>
						<Heading size="lg" fontWeight={500} noOfLines={2}>
							{title}
						</Heading>
						<Text color="gray.200" fontSize="sm" mb={2} mt={4}>
							{readableDate(publishedAt)} &bull; {minutes} min read
						</Text>
						{tags && (
							<Flex gap={2} flexWrap="wrap">
								{tags.map(tag => (
									<Tag
										fontFamily="Jetbrains Mono"
										rounded="lg"
										fontSize="xs"
										letterSpacing={1}
										bgColor="accent"
										color="text"
										key={tag}
									>
										{tag}
									</Tag>
								))}
							</Flex>
						)}
					</Box>
					{previewImage && (
						<Box ml={12}>
							<NextImage src={previewImage} width={200} height={100} objectFit="cover" />
						</Box>
					)}
				</Flex>
			</Link>
		</NextLink>
	);
}
