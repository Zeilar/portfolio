/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
	const content: any;
	export const ReactComponent: React.FC;
	export default content;
}
