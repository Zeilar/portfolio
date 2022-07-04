import { Container, Flex, Icon, Text } from "@chakra-ui/react";
import { ReactComponent as BrandIcon } from "../../assets/svgs/brand.svg";
import { ReactComponent as GitHubIcon } from "../../assets/svgs/github.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/svgs/linkedin.svg";
import { ReactComponent as DiscordIcon } from "../../assets/svgs/discord.svg";
import SocialLink from "./SocialLink";

const year = new Date().getFullYear();

export default function Footer() {
	return (
		<Flex as="footer" bgColor="gray.900">
			<Container maxW="container.xl" py={[6, "5rem"]}>
				<Flex alignItems="center" justifyContent="space-between" mb={8}>
					<Flex alignItems="center">
						<Icon as={BrandIcon} fontSize="5xl" mr={4} />
						<Text fontSize="xl">Angelin</Text>
					</Flex>
					<Flex gap={4} fontSize="4xl" fill="accent">
						<SocialLink href="https://github.com/Zeilar" icon={GitHubIcon} />
						<SocialLink href="https://www.linkedin.com/in/philip-angelin-a36b50138/" icon={LinkedInIcon} />
						<SocialLink href="https://discordapp.com/users/136815694095450113" icon={DiscordIcon} />
					</Flex>
				</Flex>
				<Text color="gray.200">&copy; {year} Angelin, All Rights Reserved</Text>
			</Container>
		</Flex>
	);
}
