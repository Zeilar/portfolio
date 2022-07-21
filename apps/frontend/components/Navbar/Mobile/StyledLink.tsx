import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function StyledLink({ href, ...props }: Props) {
	const { pathname } = useRouter();
	const active = pathname === href;
	return (
		<NextLink passHref href={href}>
			<Link
				aria-current={active ? "page" : undefined}
				fontWeight={500}
				fontSize="xl"
				w="100%"
				px={6}
				py={3}
				userSelect="none"
				color={active ? "purple.400" : "gray.200"}
				_focusVisible={{ outline: 0 }}
				_hover={{ color: !active ? "purple.500" : undefined }}
				{...props}
			/>
		</NextLink>
	);
}
