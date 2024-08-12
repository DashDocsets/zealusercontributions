import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCheatSheets, xmlify } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const list = await getAllCheatSheets();
	res.setHeader("Content-Type", "application/xml");
	const result = xmlify(list);
	res.send(result);
}
