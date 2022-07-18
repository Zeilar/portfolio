import { Box, Heading, TextProps } from "@chakra-ui/react";

interface Props {
	label: React.ReactNode;
	labelProps?: TextProps;
}

export default function UnderlineHeader({ label, labelProps }: Props) {
	return (
		<Box w="fit-content" fontSize={["4xl", "5xl"]} mb={["0.5em", "1em"]}>
			<Heading size={["4xl", "5xl"]} fontWeight={500} {...labelProps}>
				{label}
			</Heading>
			<Box as="hr" w="40%" h={1} bgColor="accent" mt={["0.25em", "0.5em"]} rounded="full" />
		</Box>
	);
}
