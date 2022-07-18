export interface Post {
	title: string;
	slug: string;
	previewImage?: string;
	tags?: string[];
	body: RTDocument;
	publishedAt: string;
}

export type NodeType = "document" | "paragraph" | "embedded-asset-block";

export type RTContent = RTParagraph | RTText | RTAsset;

export interface RTDocument {
	nodeType: "document";
	content: RTContent[];
}

export interface RTParagraph {
	nodeType: "paragraph";
	value: string;
	content: [RTText];
}

export interface RTText {
	nodeType: "text";
	value: string;
}

export interface RTAsset {
	nodeType: "embedded-asset-block";
	data: {
		target: {
			sys: {
				id: string;
				type: "Link";
				linkType: "Asset";
			};
		};
	};
}
