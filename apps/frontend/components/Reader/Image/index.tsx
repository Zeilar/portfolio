import NextImage from "next/image";

interface Props {
	src: string;
	width: number;
	height: number;
}

export default function Image(props: Props) {
	return <NextImage {...props} />;
}
