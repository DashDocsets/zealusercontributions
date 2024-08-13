import {
	getCheatSheets,
	getDocsets,
	getGeneratedDocsets,
	getOfficialDocsets,
} from "@/utils";

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
	const _official = await getOfficialDocsets();

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
	const official = new Fuse(_official, options)
		.search(query)
		.map((e) => e.item);

	return (
		<>
			{generated?.length ? (
				<>
					<Title text="Generated Docsets" id="#generated" />
					<p className="-mt-8 mb-8 px-4 text-default-400">
						Generated Extra-Docsets not in Official or User Contributions.
					</p>
				</>
			) : null}
			<Grid>
				{generated.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="generated" />
				))}
			</Grid>
			{docsets?.length ? (
				<>
					<Title text="User Contributions Docsets" id="#docsets" />
					<p className="-mt-8 mb-8 px-4 text-default-400">
						User Contributions Docsets. (if you're using Dash, you already have
						access to this in your docs app)
					</p>
				</>
			) : null}
			<Grid>
				{docsets.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="docsets" />
				))}
			</Grid>
			{official?.length ? (
				<>
					<Title text="Official" id="#official" />
					<p className="-mt-8 mb-8 px-4 text-default-400">
						Official Docsets. (most probably you already have access to this in
						your docs app)
					</p>
				</>
			) : null}
			<Grid>
				{official.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="official" />
				))}
			</Grid>
			{cheatsheets?.length ? (
				<>
					<Title text="Cheatsheets" id="#cheatsheets" />
					<p className="-mt-8 mb-8 px-4 text-default-400">
						Cheatsheets. (if you're using Dash, you already have access to this
						in your docs app)
					</p>
				</>
			) : null}
			<Grid>
				{cheatsheets.map((e) => (
					<DocsetCard {...e} key={`docsets-${e.name}`} type="cheatsheets" />
				))}
			</Grid>
			{!generated?.length &&
			!docsets?.length &&
			!cheatsheets?.length &&
			!official?.length ? (
				<div className="flex flex-col items-center justify-center py-14">
					<h1 className="text-2xl font-bold">No results found</h1>
					<p className="text-lg">
						Try searching for something else or check the tabs.
					</p>
				</div>
			) : null}
			<div className="mb-8" />
		</>
	);
}
