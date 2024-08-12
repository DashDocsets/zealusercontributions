import {
	type ParseResult,
	type ParseResultListed,
	fromUrl,
	parseDomain,
} from "parse-domain";

import { BsCircle } from "react-icons/bs";
import { MdOutlineDownloading } from "react-icons/md";
import Img from "./Img";

type Author = {
	name: string;
	link: string;
};

type CardProps = {
	name: string;
	version?: string;
	"icon@2x"?: string;
	icon?: string;
	author?: Author;
	urls: Array<string>;
	type: "docsets" | "cheatsheets" | "generated";
};

const cityCodes = {
	sanfrancisco: "SFO",
	newyork: "NY",
	london: "LDN",
	frankfurt: "FRA",
};

export default function Card({
	name,
	version,
	"icon@2x": icon2x,
	icon: icon1x,
	author,
	urls,
	type,
}: CardProps) {
	const icon = icon2x || icon1x;
	const authorName = author?.name;
	const authorLink = author?.link;
	const id: string = `${type}-${name}`;
	const href: string = `#${id}`;

	const urls_ = urls.map((url, index) => {
		const urlData: ParseResult = parseDomain(fromUrl(url)) as ParseResultListed;
		const city = urlData.subDomains[0];
		return (
			<li key={url} className="flex">
				<a
					key={url}
					href={url}
					download={true}
					className="flex items-center py-1 px-2 bg-gray-100 hover:bg-gray-200 transition-colors text-xs rounded-sm gap-1"
					title={`Download .tgz docset from ${city ?? "main"}`}
					aria-label={`Download .tgz docset from ${city ?? "main"}`}
				>
					{index === 0 ? (
						<MdOutlineDownloading
							role="presentation"
							className="self-center"
							title="Download"
							aria-label="Download"
						>
							<span className="sr-only">Download</span>
						</MdOutlineDownloading>
					) : null}
					{cityCodes[city] || "Main"}
				</a>{" "}
			</li>
		);
	});

	const src =
		type === "generated"
			? `https://raw.githubusercontent.com/DashDocsets/docsets/master/images/${name}.png`
			: icon
				? `data:image/png;base64,${icon}`
				: undefined;

	return (
		<div
			className="rounded-lg bg-gray-50 grid grid-cols-[1fr_auto] overflow-hidden aspect-video"
			id={id}
		>
			<div className="flex flex-col p-4 pb-2">
				<Img
					loading="lazy"
					className="object-contain object-top w-10 h-10 mb-auto rounded"
					src={src}
					alt={`${name} icon`}
					title={`${name} icon`}
					forceFallbackIfNotSrc
					fallback={<BsCircle className="w-10 h-10 mb-auto fill-slate-400" />}
				/>

				{author && (
					<span className="text-sm -mb-1 text-slate-300">
						by{" "}
						<a href={authorLink} className="hover:text-slate-400">
							{authorName}
						</a>
					</span>
				)}
				<p className="text-xl font-bold flex flex-wrap mb-2">
					<span
						className="truncate max-w-[200px] md:max-w-[248px]"
						title={name?.replaceAll("_", " ")}
					>
						{name?.replaceAll("_", " ")}
					</span>
					<span className="truncate max-w-[200px] md:max-w-[248px]">
						@{version}
					</span>
				</p>
				<ul className="flex gap-2 flex-wrap">{urls_}</ul>
			</div>
			<div className="px-4 py-6 bg-gray-100 flex flex-col justify-between items-center">
				<a
					className="flex bg-gray-200 p-2 rounded-lg hover:bg-gray-800 hover:text-gray-50 items-center text-[0.5rem] font-semibold"
					target="_blank"
					href={`/api/${type}/${name}.json`}
					title={`JSON Feed url for ${name?.replaceAll("_", " ")}`}
					aria-label={`JSON Feed url for ${name?.replaceAll("_", " ")}`}
					rel="noreferrer"
				>
					JSON
				</a>

				<a
					className="flex flex-col duration-150 bg-gray-200 w-14 h-14 rounded-lg items-center text-lg justify-center font-bold leading-none hover:bg-gray-800 hover:text-gray-50 transition-colors pt-1"
					target="_blank"
					href={`/api/${type}/${name}.xml`}
					title={`XML Feed url for ${name?.replaceAll("_", " ")}`}
					aria-label={`XML Feed url for ${name?.replaceAll("_", " ")}`}
					rel="noreferrer"
				>
					XML
					<small className="text-[0.6rem] font-light">feed</small>
				</a>
			</div>
		</div>
	);
}
