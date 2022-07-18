import { getPosts } from "../../common/queries";
import { GetServerSidePropsResult, NextPageContext } from "next";
import UnderlineHeader from "../../components/UnderlineHeader";
import {
	Box,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	IconButton,
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
import { CloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";

interface Fields {
	search: string;
}

interface Props {
	posts: Post[];
}

export default function Blog(props: Props) {
	const originalPosts = useRef(props.posts);
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
			const posts = await getPosts(search);
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
		console.log("set to", props.posts);
		setPosts(originalPosts.current);
	}

	return (
		<Container maxW="container.xl">
			<UnderlineHeader label="Blog" />
			<FormControl as="form" onSubmit={handleSubmit(submit)} isInvalid={Boolean(formState.errors.search)} mb={8}>
				<FormLabel>Search</FormLabel>
				<Box pos="relative" width="25%">
					<Input
						variant="filled"
						placeholder="Hello world"
						pr={searchField ? 10 : undefined}
						{...register("search", {
							required: { value: true, message: "Field is required." },
							minLength: { value: 3, message: "Minimum 3 characters." },
						})}
					/>
					{searchField && (
						<IconButton
							transform="translateY(-50%)"
							size="sm"
							display="flex"
							variant="unstyled"
							aria-label="Reset search"
							icon={<CloseIcon />}
							pos="absolute"
							right={2}
							top="50%"
							onClick={resetSearch}
						/>
					)}
				</Box>
				<FormErrorMessage>{formState.errors.search?.message}</FormErrorMessage>
			</FormControl>
			{searchQuery && (
				<Heading size="lg" mb={4} fontWeight={500}>
					Results for: &nbsp;
					<Text as="span" color="accent" fontWeight={600}>
						{searchQuery}
					</Text>
				</Heading>
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
		</Container>
	);
}

export async function getServerSideProps(ctx: NextPageContext): Promise<GetServerSidePropsResult<Props>> {
	return {
		props: {
			posts: await getPosts(ctx.query.search as string | undefined),
		},
	};
}
