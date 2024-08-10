import Card from "./Card";
import Grid from "./Grid";
import { getGeneratedDocsets } from "@/utils";

export default async function GeneratedGrid() {
	const docsets = await getGeneratedDocsets();

	return (
		<Grid>
			{docsets.map((e) => (
				<Card {...e} key={`docsets-${e.name}`} type="generated" />
			))}
		</Grid>
	);
}
