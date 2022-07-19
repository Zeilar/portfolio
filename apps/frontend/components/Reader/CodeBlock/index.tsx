import { Text } from "@chakra-ui/react";

interface Props {
	code: string;
	language: string;
}

export default function CodeBlock({ code, language }: Props) {
	return (
		<Text as="pre" p={6} rounded="lg" bgColor="gray.900">
			{code}
		</Text>
	);
}
