import type { NextApiRequest, NextApiResponse } from "next";
import {
	getAllCheatSheets,
	getAllDocsets,
	getAllGeneratedDocsets,
	xmlify,
} from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const docsets = await getAllDocsets();
	const generated = await getAllGeneratedDocsets();
	const cheatsheets = await getAllCheatSheets();
	const list = [...docsets, ...generated, ...cheatsheets];
	res.setHeader("Content-Type", "application/xml");
	const result = xmlify(list);
	res.send(result);
}
