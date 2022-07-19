import { RTUnorderedList } from "../../../types/post";
import { UnorderedList as ChakraUnorderedList } from "@chakra-ui/react";
import ListItem from "../ListItem";

interface Props {
	unorderedList: RTUnorderedList;
}

export default function UnorderedList({ unorderedList }: Props) {
	return (
		<ChakraUnorderedList>
			{unorderedList.content.map((listItem, i) => (
				<ListItem key={i} listItem={listItem} />
			))}
		</ChakraUnorderedList>
	);
}
