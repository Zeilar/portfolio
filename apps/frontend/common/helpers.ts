export function parseProjectDate(date: string) {
	const [month, , , , year] = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).formatToParts(new Date(date));
	return `${month.value} ${year.value}`;
}
