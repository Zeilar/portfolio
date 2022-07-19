import { RTOrderedList } from "../../../types/post";
import { OrderedList as ChakraOrderedList } from "@chakra-ui/react";
import ListItem from "../ListItem";

interface Props {
	orderedList: RTOrderedList;
}

export default function OrderedList({ orderedList }: Props) {
	return (
		<ChakraOrderedList>
			{orderedList.content.map((listItem, i) => (
				<ListItem key={i} listItem={listItem} />
			))}
		</ChakraOrderedList>
	);
}
