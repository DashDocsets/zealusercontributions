import type { NextApiRequest, NextApiResponse } from "next";
import { getGeneratedDocsets, xmlify } from "@/utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const {
		query: { name: _name },
	} = req;

	const name = Array.isArray(_name) ? _name[0] : _name || "";

	const isJson = name.endsWith(".json");
	const trimmedName: string = isJson
		? name.replace(".json", "")
		: name.replace(".xml", "");

	const list = await getGeneratedDocsets(trimmedName);
	if (!isJson) {
		res.setHeader("Content-Type", "application/xml");
	}
	const result = isJson ? list?.at(0) : xmlify(list);
	res.send(result);
}
