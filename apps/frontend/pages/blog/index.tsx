/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPosts } from "../../common/queries";
import { GetServerSidePropsResult } from "next";
import UnderlineHeader from "../../components/UnderlineHeader";
import { Container, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import BlogCard from "../../components/BlogCard";
import { Post } from "../../types/post";
import { useState } from "react";
import { getReadingMinutes } from "../../common/helpers";
import { useForm } from "react-hook-form";

interface Fields {
	search: string;
}

interface Props {
	posts: Post[];
}

export default function Blog(props: Props) {
	const [posts, setPosts] = useState(props.posts);
	const { register, handleSubmit, formState } = useForm<Fields>({ defaultValues: { search: "" } });

	async function submit({ search }: Fields) {
		console.log("submit", search);
	}

	return (
		<Container maxW="container.xl">
			<UnderlineHeader label="Blog" />
			<FormControl as="form" onSubmit={handleSubmit(submit)} isInvalid={Boolean(formState.errors.search)} mb={8}>
				<FormLabel>Search</FormLabel>
				<Input
					variant="filled"
					placeholder="Hello world"
					width="25%"
					{...register("search", { required: { message: "Field is required.", value: true } })}
				/>
				<FormErrorMessage>{formState.errors.search?.message}</FormErrorMessage>
			</FormControl>
			<Flex flexDir="column" w="50%" gap={4}>
				{posts.map(({ body, ...post }, i) => (
					<BlogCard key={i} minutes={getReadingMinutes(body)} {...post} />
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
