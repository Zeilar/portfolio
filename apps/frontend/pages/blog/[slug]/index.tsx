import { getPost } from "../../../common/queries";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Post } from "../../../types/post";
import { Asset } from "../../../types/asset";
import Reader from "../../../components/Reader";
import { Container } from "@chakra-ui/react";
import UnderlineHeader from "../../../components/UnderlineHeader";

interface Props {
	post: Post;
	assets: Asset[];
}

export default function BlogPost({ assets, post }: Props) {
	console.log(post);
	return (
		<Container maxW="container.xl">
			<UnderlineHeader label={post.title} />
			<Reader assets={assets} document={post.body} />
		</Container>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext<{ slug: string }>
): Promise<GetServerSidePropsResult<Props>> {
	return {
		props: await getPost(ctx.params?.slug as string),
	};
}
