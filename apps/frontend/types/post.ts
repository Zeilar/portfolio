export interface Post {
	title: string;
	slug: string;
	previewImage?: string;
	tags?: string[];
	body: RTDocument;
	publishedAt: string;
}

export type NodeType =
	| "document"
	| "heading-1"
	| "heading-2"
	| "heading-3"
	| "heading-4"
	| "heading-5"
	| "heading-6"
	| "unordered-list"
	| "ordered-list"
	| "list-item"
	| "blockquote"
	| "hr"
	| "paragraph"
	| "embedded-asset-block"
	| "embedded-entry-inline";

export type RTNode =
	| RTParagraph
	| RTInlineAsset
	| RTHeading
	| RTUnorderedList
	| RTOrderedList
	| RTHr
	| RTBlockQuote
	| RTInlineEntry;

export interface RTDocument {
	nodeType: "document";
	content: RTNode[];
}

export type RTMark = "underline" | "italic" | "bold" | "code";

export interface RTBlockQuote {
	nodeType: "blockquote";
	content: RTParagraph[];
}

export interface RTHeading {
	nodeType: "heading-1" | "heading-2" | "heading-3" | "heading-4" | "heading-5" | "heading-6";
	content: RTText[];
}

export interface RTUnorderedList {
	nodeType: "unordered-list";
	content: RTListItem[];
}

export interface RTOrderedList {
	nodeType: "ordered-list";
	content: RTListItem[];
}

export interface RTParagraph {
	nodeType: "paragraph";
	content: (RTText | RTHyperLink | RTInlineEntry)[];
}

export interface RTListItem {
	nodeType: "list-item";
	content: RTParagraph[];
}

export interface RTText {
	marks: Array<{ type: RTMark }>;
	nodeType: "text";
	value: string;
}

export interface RTHyperLink {
	content: RTText[];
	nodeType: "hyperlink";
	data: {
		uri: string;
	};
}

export interface RTHr {
	nodeType: "hr";
}

export interface RTInlineAsset {
	nodeType: "embedded-asset-block";
	data: {
		target: {
			sys: {
				id: string;
			};
		};
	};
}

export interface RTInlineEntry {
	nodeType: "embedded-entry-inline";
	data: {
		target: {
			sys: {
				id: string;
			};
		};
	};
}
