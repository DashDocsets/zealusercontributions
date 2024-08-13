import type { NextApiRequest, NextApiResponse } from "next";

import { getOfficialDocsets } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const result = await getOfficialDocsets();
	res.status(200).json(result);
}
