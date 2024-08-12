import type { NextApiRequest, NextApiResponse } from "next";
import { getAllGeneratedDocsets, xmlify } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const list = await getAllGeneratedDocsets();
	res.setHeader("Content-Type", "application/xml");
	const result = xmlify(list);
	res.send(result);
}
