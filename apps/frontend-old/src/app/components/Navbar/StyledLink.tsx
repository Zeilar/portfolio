import { ChakraLinkProps, Link } from "@chakra-ui/react";
import { NavLink, NavLinkProps, To } from "react-router-dom";

interface Props {
	to: To;
	children: React.ReactNode;
}

export default (props: Props) => {
	return (
		<Link
			as={NavLink}
			pos="relative"
			py={2}
			fontWeight={500}
			color="gray.500"
			fontSize="lg"
			_after={{
				content: `""`,
				pos: "absolute",
				bottom: 0,
				left: 0,
				height: "2px",
				w: 0,
				bgColor: "accent",
			}}
			_activeLink={{ color: "text", _after: { w: "100%" } }}
			_hover={{ color: "text", _after: { w: "100%", transition: "0.15s" } }}
			{...props}
		/>
	);
};
