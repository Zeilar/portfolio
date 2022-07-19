import { getPost } from "../../../common/queries";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Post } from "../../../types/post";
import { Asset } from "../../../types/asset";
import Reader from "../../../components/Reader";
import { Container } from "@chakra-ui/react";
import UnderlineHeader from "../../../components/UnderlineHeader";
import { Entry } from "../../../types/entry";

interface Props {
	post: Post;
	assets: Asset[];
	entries: Entry[];
}

export default function BlogPost({ assets, entries, post }: Props) {
	return (
		<Container maxW="container.lg" mb={[6, "5rem"]}>
			<UnderlineHeader label={post.title} />
			<Reader entries={entries} assets={assets} document={post.body} />
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
