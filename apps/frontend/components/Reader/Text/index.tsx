import { Text as ChakraText } from "@chakra-ui/react";
import { RTText } from "../../../types/post";

interface Props {
	text: RTText;
}

export default function Text({ text }: Props) {
	const isItalic = text.marks.some(({ type }) => type === "italic");
	const isBold = text.marks.some(({ type }) => type === "bold");
	const isUnderline = text.marks.some(({ type }) => type === "underline");
	return (
		<ChakraText
			fontStyle={isItalic ? "italic" : "inherit"}
			textDecor={isUnderline ? "underline" : "inherit"}
			fontWeight={isBold ? 700 : "inherit"}
			mb={2}
		>
			{text.value}
		</ChakraText>
	);
}
