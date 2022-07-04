import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text } from "@chakra-ui/react";
import { Technology } from "apps/frontend/types/technology";
import NextImage from "next/image";

interface Props {
	technologies: Technology[];
}

export default function Mobile({ technologies }: Props) {
	return (
		<>
			<Accordion variant="solid" allowToggle>
				{technologies.map(technology => (
					<AccordionItem key={technology.url} _notFirst={{ mt: 1 }} boxShadow="md">
						<AccordionButton h="50px">
							<NextImage src={technology.image} width={25} height={25} />
							<Text ml={4}>{technology.name}</Text>
							<AccordionIcon ml="auto" />
						</AccordionButton>
						<AccordionPanel>{technology.description}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
}
