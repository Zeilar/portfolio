import { Box, BoxProps } from "@chakra-ui/react";
import polygonScatterLeft from "../../assets/svgs/polygon-scatter-1.svg";
import polygonScatterRight from "../../assets/svgs/polygon-scatter-2.svg";

interface Props {
	position: "left" | "right";
}

export default function PolygonScatter({ position }: Props) {
	const css: BoxProps = {
		[position]: 0,
		bgImg: position === "left" ? polygonScatterLeft : polygonScatterRight,
	};
	return (
		<Box
			pos="absolute"
			bottom={0}
			h="calc(100% + 200px)"
			w={200}
			zIndex={-1}
			{...css}
			sx={{
				"@media (max-width: 1900px)": {
					display: "none",
				},
			}}
		/>
	);
}
