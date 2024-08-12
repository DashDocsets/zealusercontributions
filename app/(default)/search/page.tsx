import { getCheatSheets, getDocsets, getGeneratedDocsets } from "@/utils";

import DocsetCard from "@/components/DocsetCard";
import Fuse from "fuse.js";
import Grid from "@/components/Grid";
import Title from "@/components/Title";

export const revalidate = 0;

export default async function Search({
	searchParams,
}: {
	params: Record<string, string | undefined>;
	searchParams: Record<string, string | undefined>;
}) {
	const { q } = searchParams;

	const query = q?.trim();

	if (!query) {
		return <>Start Searching...</>;
	}

	const _docsets = await getDocsets();
	const _cheatsheets = await getCheatSheets();
	const _generated = await getGeneratedDocsets();

	const options = {
		keys: ["name"],
		minMatchCharLength: 2,
	};
	const docsets = new Fuse(_docsets, options).search(query).map((e) => e.item);
	const cheatsheets = new Fuse(_cheatsheets, options)
		.search(query)
		.map((e) => e.item);
	const generated = new Fuse(_generated, options)
		.search(query)
		.map((e) => e.item);

	return (
		<>
			{generated?.length ? (
				<Title text="Generated Docsets" id="#generated" />
			) : null}
			<Grid>
				{generated.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="generated" />
				))}
			</Grid>
			{docsets?.length ? <Title text="Docsets" id="#docsets" /> : null}
			<Grid>
				{docsets.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="docsets" />
				))}
			</Grid>
			{cheatsheets?.length ? (
				<Title text="Cheatsheets" id="#cheatsheets" />
			) : null}
			<Grid>
				{cheatsheets.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="cheatsheets" />
				))}
			</Grid>
			{!generated?.length && !docsets?.length && !cheatsheets?.length ? (
				<div className="flex flex-col items-center justify-center py-14">
					<h1 className="text-2xl font-bold">No results found</h1>
					<p className="text-lg">
						Try searching for something else or check the tabs.
					</p>
				</div>
			) : null}
		</>
	);
}
