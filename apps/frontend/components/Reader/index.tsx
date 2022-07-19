import { RTDocument } from "../../types/post";
import BlockQuote from "./BlockQuote";
import Heading from "./Heading";
import Hr from "./Hr";
import OrderedList from "./OrderedList";
import Paragraph from "./Paragraph";
import UnorderedList from "./UnorderedList";

interface Props {
	document: RTDocument;
}

export default function Reader({ document }: Props) {
	return (
		<div>
			{document.content.map((node, i) => {
				console.log(node);
				switch (node.nodeType) {
					case "paragraph":
						return <Paragraph key={i} paragraph={node} />;
					case "heading-1":
						return <Heading key={i} level={1} heading={node} />;
					case "heading-2":
						return <Heading key={i} level={2} heading={node} />;
					case "heading-3":
						return <Heading key={i} level={3} heading={node} />;
					case "heading-4":
						return <Heading key={i} level={4} heading={node} />;
					case "heading-5":
						return <Heading key={i} level={5} heading={node} />;
					case "heading-6":
						return <Heading key={i} level={6} heading={node} />;
					case "unordered-list":
						return <UnorderedList key={i} unorderedList={node} />;
					case "ordered-list":
						return <OrderedList key={i} orderedList={node} />;
					case "hr":
						return <Hr key={i} />;
					case "blockquote":
						return <BlockQuote key={i} blockQuote={node} />;
					default:
						return null;
				}
			})}
		</div>
	);
}
