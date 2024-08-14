import { cache } from "react";
import {
	getCheatSheets as _getCheatSheets,
	getDocsets as _getDocsets,
	getGeneratedDocsets as _getGeneratedDocsets,
	getOfficialDocsets as _getOfficialDocsets,
} from "@/utils";

import DocsetCard, { type DocsetCardProps } from "@/components/DocsetCard";
import Fuse, { type IFuseOptions } from "fuse.js";
import Grid from "@/components/Grid";
import Title from "@/components/Title";

const getCheatSheets = cache(_getCheatSheets);
const getDocsets = cache(_getDocsets);
const getGeneratedDocsets = cache(_getGeneratedDocsets);
const getOfficialDocsets = cache(_getOfficialDocsets);

export const revalidate = 300;

export default async function Search({
	searchParams,
}: {
	params: Record<string, string | undefined>;
	searchParams: Record<string, string | undefined>;
}) {
	const { q } = searchParams;

	const query = q?.trim();

	if (!query) {
		return (
			<div className="text-3xl text-center text-gray-400">
				Start Searching...
			</div>
		);
	}

	const _docsets = await getDocsets();
	const _cheatsheets = await getCheatSheets();
	const _generated = await getGeneratedDocsets();
	const _official = await getOfficialDocsets();

	const docsets = _docsets.map((e) => ({
		...e,
		type: "docsets" as DocsetCardProps["type"],
	}));
	const cheatsheets = _cheatsheets.map((e) => ({
		...e,
		type: "cheatsheets" as DocsetCardProps["type"],
	}));
	const generated = _generated.map((e) => ({
		...e,
		type: "generated" as DocsetCardProps["type"],
	}));
	const official = _official.map((e) => ({
		...e,
		type: "official" as DocsetCardProps["type"],
	}));

	const options: IFuseOptions<{
		name: string;
		urls: string[];
		type: DocsetCardProps["type"];
	}> = {
		keys: ["name"],
		minMatchCharLength: 2,
	};

	const items = new Fuse(
		[...generated, ...docsets, ...cheatsheets, ...official],
		options,
	).search(query);

	return (
		<>
			{items?.length ? (
				<>
					<Title
						text={
							<>
								Search Results for{" "}
								<code className="px-4 py-1.5 bg-primary-50 rounded">
									{query}
								</code>
							</>
						}
					/>
					<Grid>
						{items.map((e) => (
							<DocsetCard
								{...e.item}
								key={`${e.item.type}-${e.item.name}`}
								type={e.item.type}
							/>
						))}
					</Grid>
				</>
			) : (
				<div className="flex flex-col items-center justify-center py-14">
					<h1 className="text-2xl font-bold">No results found</h1>
					<p className="text-lg">
						Try searching for something else or check the tabs.
					</p>
				</div>
			)}

			<div className="mb-8" />
		</>
	);
}
