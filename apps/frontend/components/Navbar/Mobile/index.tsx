import { Box, Flex, Icon, IconButton, Link, useDisclosure } from "@chakra-ui/react";
import StyledLink from "./StyledLink";
import NextLink from "next/link";
import { ReactComponent as BrandIcon } from "../../../assets/svgs/brand.svg";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Mobile() {
	const { isOpen, onToggle } = useDisclosure();
	return (
		<Box
			as="header"
			zIndex={50}
			pos="fixed"
			transition="0.25s ease-out"
			w="100%"
			top={0}
			h={75}
			boxShadow={isOpen ? "none" : "md"}
		>
			<Flex
				bgColor="gray.700"
				as="nav"
				alignItems="center"
				justifyContent="space-between"
				h="100%"
				px={4}
				pos="relative"
			>
				<NextLink href="/" passHref>
					<Link display="flex" userSelect="none" fontSize="4xl" color="accent">
						<Icon as={BrandIcon} w="1em" h="1em" />
					</Link>
				</NextLink>
				<div>
					<IconButton
						aria-label="Toggle menu"
						variant="unstyled"
						as={HamburgerIcon}
						onClick={onToggle}
						color={isOpen ? "accent" : "gray.200"}
						_hover={{ color: "accent" }}
					/>
					<Flex
						w="100%"
						as="ul"
						pos="absolute"
						top={75}
						left={0}
						py={3}
						flexDir="column"
						boxShadow="md"
						zIndex={-1}
						transition="0.25s ease-out"
						transform={`translateY(${isOpen ? 0 : "-100%"})`}
						_after={{
							content: `""`,
							pos: "absolute",
							opacity: 0.95,
							bgColor: "gray.700",
							backdropFilter: "blur(5px)",
							w: "100%",
							h: "100%",
							top: 0,
							zIndex: -1,
							transition: "inherit",
						}}
					>
						<Flex
							opacity={isOpen ? 1 : 0}
							as="li"
							transition="0.25s ease-out"
							transitionDelay={isOpen ? "0.1s" : "0s"}
						>
							<StyledLink href="/">Home</StyledLink>
						</Flex>
						<Flex
							opacity={isOpen ? 1 : 0}
							as="li"
							transition="0.25s ease-out"
							transitionDelay={isOpen ? "0.1s" : "0s"}
						>
							<StyledLink href="/projects">Projects</StyledLink>
						</Flex>
						<Flex
							opacity={isOpen ? 1 : 0}
							as="li"
							transition="0.25s ease-out"
							transitionDelay={isOpen ? "0.1s" : "0s"}
						>
							<StyledLink href="/blog">Blog</StyledLink>
						</Flex>
					</Flex>
				</div>
			</Flex>
		</Box>
	);
}
