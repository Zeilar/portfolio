import { Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
	icon: React.FC;
	href: string;
}

export default function SocialLink({ icon, href }: Props) {
	return (
		<NextLink passHref href={href}>
			<Link isExternal display="flex">
				<Icon as={icon} fill="accent" _hover={{ fill: "purple.400" }} />
			</Link>
		</NextLink>
	);
}
