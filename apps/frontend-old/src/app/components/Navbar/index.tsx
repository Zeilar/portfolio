import { Box, Container, ContainerProps, Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import StyledLink from "./StyledLink";

const THRESHOLD = 200;

export default function Navbar() {
	const [isAnimated, setIsAnimated] = useState(window.scrollY > THRESHOLD);

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
			<Container maxW="container.lg">
				<Flex as="nav" gap="3.5rem" alignItems="center">
					<Box as="li" mr={10}>
						<NavLink to="/">🎈</NavLink>
					</Box>
					<Flex as="ul" gap="3.5rem">
						<li>
							<StyledLink to="/">Home</StyledLink>
						</li>
						<li>
							<StyledLink to="/projects">Projects</StyledLink>
						</li>
						<li>
							<StyledLink to="/contact">Contact</StyledLink>
						</li>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
