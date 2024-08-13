import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getCheatSheets as _getCheatSheets } from "@/utils";
import { cache } from "react";

const getCheatSheets = cache(_getCheatSheets);

export default async function CheatsheetsGrid() {
	const cheatsheets = await getCheatSheets();
	return (
		<Grid>
			{cheatsheets.map((e) => (
				<DocsetCard {...e} key={`cheatsheets-${e.name}`} type="cheatsheets" />
			))}
		</Grid>
	);
}
