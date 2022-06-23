import { Box, Container, ContainerProps, Flex, Link } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import StyledLink from "./StyledLink";
import NextLink from "next/link";

const THRESHOLD = 200;

export default function Navbar() {
	const [isAnimated, setIsAnimated] = useState(() => {
		return typeof window !== "undefined" ? window.scrollY > THRESHOLD : false;
	});

	useEffect(() => {
		function onScroll() {
			setIsAnimated(window.scrollY > THRESHOLD);
		}
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	const animatedStyles = useMemo<ContainerProps>(
		() =>
			isAnimated
				? {
						py: 4,
						_after: {
							content: `""`,
							pos: "absolute",
							bgColor: "blackAlpha.300",
							backdropFilter: "blur(px)",
							w: "100%",
							h: "100%",
							top: 0,
							zIndex: -1,
							transition: "0.05s",
						},
				  }
				: {},
		[isAnimated]
	);

	return (
		<Box as="header" pos="sticky" top={0} py={10} transition="0.15s" {...animatedStyles}>
			<Container maxW="container.xl">
				<Flex as="ul" gap="3.5rem">
					<Flex as="nav" gap="3.5rem" alignItems="center">
						<Box as="li" mr="3.5rem">
							<NextLink href="/" passHref>
								<Link userSelect="none" fontSize="4xl" color="accent">
									A
								</Link>
							</NextLink>
						</Box>
						<li>
							<StyledLink href="/">Home</StyledLink>
						</li>
						<li>
							<StyledLink href="/projects">Projects</StyledLink>
						</li>
						<li>
							<StyledLink href="/contact">Contact</StyledLink>
						</li>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
