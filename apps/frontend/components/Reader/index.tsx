import { Box } from "@chakra-ui/react";
import { Entry } from "../../types/entry";
import { Asset } from "../../types/asset";
import { RTDocument } from "../../types/post";
import BlockQuote from "./BlockQuote";
import Heading from "./Heading";
import Hr from "./Hr";
import Image from "./Image";
import OrderedList from "./OrderedList";
import Paragraph from "./Paragraph";
import UnorderedList from "./UnorderedList";

interface Props {
	document: RTDocument;
	assets: Asset[];
	entries: Entry[];
}

export default function Reader({ assets, document, entries }: Props) {
	return (
		<Box whiteSpace="break-spaces">
			{document.content.map((node, i) => {
				switch (node.nodeType) {
					case "paragraph":
						return <Paragraph key={i} paragraph={node} entries={entries} />;
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
					case "embedded-asset-block":
						// eslint-disable-next-line no-case-declarations
						const image: Asset | undefined = assets.find(asset => asset.sys.id === node.data.target.sys.id);
						return image ? (
							// eslint-disable-next-line jsx-a11y/alt-text
							<Image
								key={i}
								src={`https:${image.fields.file.url}`}
								height={image.fields.file.details.image.height}
								width={image.fields.file.details.image.width}
							/>
						) : null;
					case "embedded-entry-inline":
						console.log(node);
						return null;
					default:
						return null;
				}
			})}
		</Box>
	);
}
