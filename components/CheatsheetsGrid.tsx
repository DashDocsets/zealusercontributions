import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getCheatSheets } from "@/utils";

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
