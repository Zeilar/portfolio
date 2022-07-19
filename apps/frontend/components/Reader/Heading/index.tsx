import { Heading as ChakraHeading, ThemingProps } from "@chakra-ui/react";
import { RTHeading } from "../../../types/post";
import Text from "../Text";

interface Props {
	heading: RTHeading;
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizes: Record<Props["level"], ThemingProps<"Heading">["size"]> = {
	1: "4xl",
	2: "3xl",
	3: "2xl",
	4: "xl",
	5: "lg",
	6: "md",
};

export default function Heading({ heading, level }: Props) {
	return (
		<ChakraHeading as={`h${level}`} size={sizes[level]}>
			{heading.content.map((text, i) => (
				<Text key={i} text={text} />
			))}
		</ChakraHeading>
	);
}
