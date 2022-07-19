import { RTParagraph } from "../../../types/post";
import HyperLink from "../HyperLink";
import Text from "../Text";

interface Props {
	paragraph: RTParagraph;
}

export default function Paragraph({ paragraph }: Props) {
	return (
		<>
			{paragraph.content.map((node, i) => {
				switch (node.nodeType) {
					case "text":
						return <Text key={i} text={node} />;
					case "hyperlink":
						return <HyperLink key={i} hyperLink={node} />;
					default:
						return null;
				}
			})}
		</>
	);
}
