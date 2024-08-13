import type { NextApiRequest, NextApiResponse } from "next";
import { getAllDocsets, xmlify } from "@/utils";
import { getOfficialDocsets } from "@/utils/getOfficialDocsets";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const list = await getOfficialDocsets();
	res.setHeader("Content-Type", "application/xml");
	const result = xmlify(list);
	res.send(result);
}
