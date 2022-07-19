import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { format } from "prettier";
import parserTypeScript from "prettier/parser-typescript";

interface Props {
	code: string;
	language: string;
}

export default function CodeBlock({ code, language }: Props) {
	return (
		<SyntaxHighlighter
			language={language}
			style={{
				...atomOneDark,
				hljs: {
					background: "var(--chakra-colors-gray-900)",
					borderRadius: "var(--chakra-radii-lg)",
					padding: "var(--chakra-sizes-6)",
					overflow: "auto",
				},
			}}
		>
			{format(code, { tabWidth: 2, parser: "typescript", plugins: [parserTypeScript] })}
		</SyntaxHighlighter>
	);
}
