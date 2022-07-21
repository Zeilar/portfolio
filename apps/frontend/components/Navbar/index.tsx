import { Box, Container, Flex, Icon, Link, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import StyledLink from "./StyledLink";
import NextLink from "next/link";
import { ReactComponent as BrandIcon } from "../../assets/svgs/brand.svg";

export default function Navbar() {
	const [isAnimated, setIsAnimated] = useState(false);
	const threshold = useBreakpointValue({ base: 25, sm: 100 }) ?? 100;

	useEffect(() => {
		setIsAnimated(window.scrollY > threshold);
		function onScroll() {
			setIsAnimated(window.scrollY > threshold);
		}
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [threshold]);

	return (
		<Box
			as="header"
			zIndex={50}
			pos="fixed"
			transition="0.25s ease"
			top={0}
			w="100%"
			h={isAnimated ? 85 : 100}
			boxShadow={isAnimated ? "md" : "none"}
			_after={{
				content: `""`,
				pos: "absolute",
				opacity: isAnimated ? 0.97 : 0,
				bgColor: "gray.700",
				backdropFilter: "blur(5px)",
				w: "100%",
				h: "100%",
				top: 0,
				zIndex: -1,
				transition: "inherit",
			}}
		>
			<Container maxW="container.xl" h="100%">
				<Flex as="nav" alignItems="center" h="100%">
					<Flex as="ul" gap="3.5rem" alignItems="center">
						<Box as="li">
							<NextLink href="/" passHref>
								<Link display="flex" userSelect="none" fontSize="4xl" color="accent">
									<Icon as={BrandIcon} w="1em" h="1em" />
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
							<StyledLink href="/blog">Blog</StyledLink>
						</li>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
