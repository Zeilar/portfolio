import { Language } from "prism-react-renderer";

export interface Entry {
	sys: {
		id: string;
	};
	fields: {
		code: string;
		language: Language;
	};
}
