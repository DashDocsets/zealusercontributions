import type { NextApiRequest, NextApiResponse } from "next";
import { getAllDocsets, xmlify } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const list = await getAllDocsets();
	res.setHeader("Content-Type", "application/xml");
	const result = xmlify(list);
	res.send(result);
}
