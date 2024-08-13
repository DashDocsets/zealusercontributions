import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getOfficialDocsets as _getOfficialDocsets } from "@/utils";
import { cache } from "react";

const getOfficialDocsets = cache(_getOfficialDocsets);

export default async function OfficialGrid() {
	const docsets = await getOfficialDocsets();

	return (
		<Grid>
			{docsets.map((e) => (
				<DocsetCard {...e} key={`docsets-${e.name}`} type="official" />
			))}
		</Grid>
	);
}
