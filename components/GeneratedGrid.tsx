import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getGeneratedDocsets } from "@/utils";

export default async function GeneratedGrid() {
	const docsets = await getGeneratedDocsets();

	return (
		<Grid>
			{docsets.map((e) => (
				<DocsetCard {...e} key={`docsets-${e.name}`} type="generated" />
			))}
		</Grid>
	);
}
