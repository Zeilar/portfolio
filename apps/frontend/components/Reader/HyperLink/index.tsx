import { Link } from "@chakra-ui/react";
import { RTHyperLink } from "../../../types/post";
import Text from "../Text";

interface Props {
	hyperLink: RTHyperLink;
}

export default function HyperLink({ hyperLink }: Props) {
	return (
		<Link isExternal href={hyperLink.data.uri} display="inline-flex" w="fit-content" color="purple.300">
			{hyperLink.content.map((text, i) => (
				<Text key={i} text={text} />
			))}
		</Link>
	);
}
