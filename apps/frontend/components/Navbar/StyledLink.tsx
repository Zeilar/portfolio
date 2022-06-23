import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function StyledLink({ href, ...props }: Props) {
	const router = useRouter();
	return (
		<NextLink passHref href={href}>
			<Link
				aria-current={router.pathname === href ? "page" : undefined}
				pos="relative"
				py={2}
				fontWeight={500}
				color="gray.500"
				fontSize="lg"
				userSelect="none"
				_after={{
					content: `""`,
					pos: "absolute",
					bottom: 0,
					left: 0,
					height: "2px",
					w: 0,
					bgColor: "accent",
					rounded: "full",
				}}
				_activeLink={{ color: "text", _after: { w: "100%" } }}
				_hover={{ color: "text", _after: { w: "100%", transition: "0.25s" } }}
				{...props}
			/>
		</NextLink>
	);
}
