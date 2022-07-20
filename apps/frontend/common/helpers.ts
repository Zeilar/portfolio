import { RTDocument } from "../types/post";

export function readableDate(date: string | number | Date) {
	const [month, , , , year] = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).formatToParts(new Date(date));
	return `${month.value} ${year.value}`;
}

export function clamp(number: number, min: number, max: number) {
	return Math.min(Math.max(number, min), max);
}

export function getReadingMinutes({ content }: RTDocument) {
	const words = content.reduce((total, current) => {
		if (current.nodeType !== "paragraph") {
			return total;
		}
		return (
			total +
			current.content.reduce((total, current) => {
				switch (current.nodeType) {
					case "hyperlink":
						return (
							total +
							current.content.reduce((total, current) => total + current.value.split(" ").length, 0)
						);
					case "text":
						return total + current.value.split(" ").length;
					default:
						return total;
				}
			}, 0)
		);
	}, 0);
	return Math.ceil(words / 200);
}
