import { getPosts } from "../../common/queries";
import { GetServerSidePropsResult, NextPageContext } from "next";
import UnderlineHeader from "../../components/UnderlineHeader";
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react";
import BlogCard from "../../components/BlogCard";
import { Post } from "../../types/post";
import { useState } from "react";
import { getReadingMinutes } from "../../common/helpers";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Asset } from "../../types/asset";

import Reader from "../../components/Reader";

interface Fields {
	search: string;
}

interface Props {
	posts: Post[];
	assets: Asset[];
}

export default function Blog(props: Props) {
	const [posts, setPosts] = useState(props.posts);
	const { register, handleSubmit, formState, watch, reset } = useForm<Fields>({ defaultValues: { search: "" } });
	const { replace, query } = useRouter();
	const toast = useToast({ position: "top" });
	const searchField = watch("search");
	const searchQuery = query.search as string | undefined;

	async function submit({ search }: Fields) {
		if (formState.isSubmitting) {
			return;
		}
		try {
			await replace(`?search=${search}`);
			const { posts } = await getPosts(search);
			setPosts(posts);
		} catch (error) {
			toast({ status: "error", title: "Error when searching" });
		}
	}

	async function resetSearch() {
		if (formState.isSubmitting) {
			return;
		}
		replace("");
		reset();
	}

	useEffect(() => {
		submit({ search: searchField });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<Container maxW="container.xl">
			<UnderlineHeader label="Blog" />
			<FormControl as="form" onSubmit={handleSubmit(submit)} isInvalid={Boolean(formState.errors.search)} mb={8}>
				<FormLabel>Search</FormLabel>
				<Box w="25%">
					<Input
						variant="filled"
						placeholder="Hello world"
						{...register("search", {
							required: { value: true, message: "Field is required." },
							minLength: { value: 3, message: "Minimum 3 characters." },
						})}
					/>
				</Box>
				<FormErrorMessage>{formState.errors.search?.message}</FormErrorMessage>
			</FormControl>
			{searchQuery && (
				<Box mb={4}>
					<Heading size="lg" fontWeight={500}>
						Results for: &nbsp;
						<Text as="span" color="accent" fontWeight={600}>
							&quot;{searchQuery}&quot;
						</Text>
					</Heading>
					<Button mt={2} variant="link" size="lg" color="accent" _active={{}} onClick={resetSearch}>
						Reset
					</Button>
				</Box>
			)}
			{formState.isSubmitting ? (
				<Spinner color="accent" size="xl" />
			) : (
				<Flex flexDir="column" w="50%" gap={4}>
					{posts.map(({ body, ...post }, i) => (
						<BlogCard key={i} minutes={getReadingMinutes(body)} {...post} />
					))}
				</Flex>
			)}
			<Reader assets={props.assets} document={posts[0].body} />
		</Container>
	);
}

export async function getServerSideProps(ctx: NextPageContext): Promise<GetServerSidePropsResult<Props>> {
	return {
		props: await getPosts(ctx.query.search as string | undefined),
	};
}
