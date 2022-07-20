export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NX_SENDGRID_API_KEY: string;
			NX_CONTENTFUL_ACCESS_TOKEN: string;
			NX_CONTENTFUL_SPACE_ID: string;
		}
	}
}
