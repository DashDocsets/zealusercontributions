import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getDocsets } from "@/utils";

export default async function DocsetsGrid() {
	const docsets = await getDocsets();

	return (
		<Grid>
			{docsets.map((e) => (
				<DocsetCard {...e} key={`docsets-${e.name}`} type="docsets" />
			))}
		</Grid>
	);
}
