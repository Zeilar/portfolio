import { Box, Container, ContainerProps, Flex, Icon, Link } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import StyledLink from "./StyledLink";
import NextLink from "next/link";
import { ReactComponent as BrandIcon } from "../../assets/svgs/brand.svg";

const THRESHOLD = 100;

export default function Navbar() {
	const [isAnimated, setIsAnimated] = useState(false);

	useEffect(() => {
		setIsAnimated(window.scrollY > THRESHOLD);
		function onScroll() {
			setIsAnimated(window.scrollY > THRESHOLD);
		}
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	const animatedStyles = useMemo<ContainerProps>(
		() => (isAnimated ? { h: 75, boxShadow: "md" } : { h: 100 }),
		[isAnimated]
	);

	return (
		<Box
			as="header"
			zIndex={5}
			pos="fixed"
			transition="0.5s ease"
			top={0}
			h={100}
			w="100%"
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
				transition: "0.25s ease",
			}}
			{...animatedStyles}
		>
			<Container maxW="container.xl" h="100%">
				<Flex as="ul" gap="3.5rem" alignItems="center" h="100%">
					<Flex as="nav" gap="3.5rem" alignItems="center">
						<Box as="li" mr="3.5rem">
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
							<StyledLink href="/contact">Contact</StyledLink>
						</li>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
