import { ListItem as ChakraListItem } from "@chakra-ui/react";
import { RTListItem } from "../../../types/post";
import Paragraph from "../Paragraph";

interface Props {
	listItem: RTListItem;
}

export default function ListItem({ listItem }: Props) {
	return (
		<ChakraListItem>
			{listItem.content.map((paragraph, i) => (
				<Paragraph key={i} paragraph={paragraph} />
			))}
		</ChakraListItem>
	);
}
