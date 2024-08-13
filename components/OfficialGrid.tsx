import DocsetCard from "./DocsetCard";
import Grid from "./Grid";
import { getOfficialDocsets } from "@/utils";

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
