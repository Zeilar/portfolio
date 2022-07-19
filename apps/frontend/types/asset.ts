export interface Asset {
	fields: {
		file: {
			url: string;
			details: {
				image: {
					width: number;
					height: number;
				};
			};
		};
	};
	sys: {
		id: string;
	};
}
