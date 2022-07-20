import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { Box, IconButton, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import theme from "prism-react-renderer/themes/nightOwl";
import { CopyIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";

interface Props {
	code: string;
	language: Language;
}

export default function CodeBlock({ code, language }: Props) {
	const marginX = useBreakpointValue({ base: 0, sm: "calc(var(--chakra-sizes-6) * -1)" });
	const formattedCode = useMemo(() => code.replaceAll("\t", "  "), [code]);
	const [supportsNavigator, setSupportsNavigator] = useState(false);

	function copy() {
		navigator.clipboard.writeText(formattedCode);
	}

	useEffect(() => {
		setSupportsNavigator(Boolean(window.navigator));
	}, []);

	return (
		<Highlight {...defaultProps} theme={theme} code={formattedCode} language={language}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Box
					as="pre"
					className={className}
					style={style}
					bgColor="gray.900"
					rounded="lg"
					marginX={marginX}
					pos="relative"
				>
					{supportsNavigator && (
						<Tooltip placement="top" label="Copy" closeOnClick={false}>
							<IconButton
								aria-label="Copy code"
								icon={<CopyIcon />}
								right={4}
								top={4}
								pos="absolute"
								onClick={copy}
							/>
						</Tooltip>
					)}
					<Box overflow="auto" p={6}>
						{tokens.map((line, i) => (
							<Box key={i} {...getLineProps({ line, key: i })}>
								<Box display="table-cell" color="gray.400" userSelect="none">
									{i + 1}
								</Box>
								<Box display="table-cell" pl={6}>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			)}
		</Highlight>
	);
	// return <Highlight language={language} code={code.replaceAll("\t", "  ")} />;
}
