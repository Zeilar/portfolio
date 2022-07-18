import { RTDocument } from "../types/post";

export function readableDate(date: string | number | Date) {
	const [month, , , , year] = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).formatToParts(new Date(date));
	return `${month.value} ${year.value}`;
}

export function clamp(number: number, min: number, max: number) {
	return Math.min(Math.max(number, min), max);
}

export function getReadingMinutes({ content }: RTDocument) {
	const words = content.reduce(
		(total, acc) => (acc.nodeType === "paragraph" ? total + acc.content[0].value.split(" ").length : total),
		0
	);
	return Math.ceil(words / 200);
}
