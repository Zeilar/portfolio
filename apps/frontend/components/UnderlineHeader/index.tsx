import { Box, Text, TextProps } from "@chakra-ui/react";

interface Props {
	label: React.ReactNode;
	labelProps?: TextProps;
}

export default function UnderlineHeader({ label, labelProps }: Props) {
	return (
		<Box w="fit-content">
			<Text fontSize="5xl" {...labelProps}>
				{label}
			</Text>
			<Box as="hr" w="40%" h={1} bgColor="accent" mt={4} rounded="full" />
		</Box>
	);
}
