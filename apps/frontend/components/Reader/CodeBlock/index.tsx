import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useBreakpointValue } from "@chakra-ui/react";

interface Props {
	code: string;
	language: string;
}

export default function CodeBlock({ code, language }: Props) {
	const marginX = useBreakpointValue({ base: 0, sm: "calc(var(--chakra-sizes-6) * -1)" });
	return (
		<SyntaxHighlighter
			language={language}
			style={{
				...atomOneDark,
				hljs: {
					background: "var(--chakra-colors-gray-900)",
					borderRadius: "var(--chakra-radii-lg)",
					padding: "var(--chakra-sizes-6)",
					marginLeft: marginX,
					marginRight: marginX,
					overflow: "auto",
				},
			}}
		>
			{code.replaceAll("\t", "  ")}
		</SyntaxHighlighter>
	);
}
