import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getGeneratedDocsets as _getGeneratedDocsets } from "@/utils";
import { cache } from "react";

const getGeneratedDocsets = cache(_getGeneratedDocsets);

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
