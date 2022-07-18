/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPosts } from "../../common/queries";
import { GetServerSidePropsResult } from "next";
import UnderlineHeader from "../../components/UnderlineHeader";
import { Container, Flex } from "@chakra-ui/react";
import BlogCard from "../../components/BlogCard";
import { Post } from "../../types/post";

interface Props {
	posts: Post[];
}

export default function Blog({ posts = [] }: Props) {
	console.log({ posts });
	return (
		<Container maxW="container.xl">
			<UnderlineHeader label="Blog" />
			<Flex flexDir="column" w="50%">
				{posts.map(({ body, ...post }, i) => (
					<BlogCard key={i} date={new Date()} minutes={5} {...post} />
				))}
			</Flex>
		</Container>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
	const fetcher = getPosts();
	const response = await fetcher();
	const data = await response.json();
	const posts: any[] = data.items.map((project: any) => {
		const asset = data.includes.Asset.find((asset: any) => project.fields.previewImage.sys.id === asset.sys.id);
		return {
			...project.fields,
			previewImage: `https:${asset.fields.file.url}`,
		};
	});
	return {
		props: {
			posts,
		},
	};
}
