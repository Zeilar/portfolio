import { NextApiRequest, NextApiResponse } from "next";
import sendGrid from "@sendgrid/mail";

interface Fields {
	name: string;
	email: string;
	message: string;
}

sendGrid.setApiKey(process.env.NX_SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email, message, name }: Fields = JSON.parse(req.body);
	await sendGrid.send({
		from: {
			email: "philip@angelin.dev",
			name: `${name} <${email}>`,
		},
		to: "philip_angelin@hotmail.com",
		subject: "Hello",
		html: message,
	});
	res.status(204).end();
}
