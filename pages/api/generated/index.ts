import type { NextApiRequest, NextApiResponse } from "next";

import { getGeneratedDocsets } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const result = await getGeneratedDocsets();
	res.status(200).json(result);
}
