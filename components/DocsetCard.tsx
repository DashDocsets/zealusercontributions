"use client";

import {
	type ParseResult,
	type ParseResultListed,
	fromUrl,
	parseDomain,
} from "parse-domain";
import {
	Chip,
	Card,
	CardHeader,
	Avatar,
	Button,
	CardBody,
	CardFooter,
} from "@nextui-org/react";

import { BsCircle } from "react-icons/bs";
import { MdRssFeed } from "react-icons/md";
import {
	IoOpenOutline,
	IoClipboard,
	IoClipboardOutline,
} from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { encodeURL } from "@/utils/encodeURL";
import { useClipboard } from "@mantine/hooks";

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

export default function DocsetCard({
	name,
	version,
	"icon@2x": icon2x,
	icon: icon1x,
	author,
	urls,
	type,
}: CardProps) {
	const { copied, copy } = useClipboard({ timeout: 1000 });
	const icon = icon2x || icon1x;
	const authorName = author?.name;
	const authorLink = author?.link;
	const id: string = `${type}-${name}`;
	const href: string = `#${id}`;

	const urls_ = urls.map((url, index) => {
		const urlData: ParseResult = parseDomain(fromUrl(url)) as ParseResultListed;
		const city = urlData.subDomains[0];
		const isMain = index === 0;
		return (
			<li key={url} className="contents">
				<Button
					className={isMain ? "col-span-4" : "col-span-1"}
					as="a"
					key={url}
					href={url}
					download
					title={`Download .tgz docset from ${city ?? "main"}`}
					aria-label={`Download .tgz docset from ${city ?? "main"}`}
					color={isMain ? "primary" : "default"}
					variant="flat"
					radius="full"
					size={isMain ? "lg" : "sm"}
				>
					<MdOutlineDownloading
						role="presentation"
						className="self-center"
						title="Download"
						aria-label="Download"
					>
						<span className="sr-only">Download</span>
					</MdOutlineDownloading>

					{cityCodes[city] || "Download"}
				</Button>
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
		<Card>
			<CardHeader className="gap-3 items-start max-w-full pt-4">
				<Avatar
					radius="full"
					className="p-1 bg-transparent shrink-0"
					isBordered
					size="md"
					src={src}
					fallback={<BsCircle className="w-10 h-10 mb-auto fill-slate-400" />}
				/>
				<div className="flex flex-col gap-1 items-start justify-center max-w-full">
					<h4 className="text-large font-semibold leading-none flex gap-1 items-center">
						{name?.replaceAll("_", " ")}
					</h4>
					{author && (
						<span className="text-xs text-slate-300 flex gap-1 max-w-full">
							by{" "}
							<a href={authorLink} className="hover:text-slate-400 min-w-0">
								{authorName}
							</a>
						</span>
					)}
					<Chip size="sm" variant="flat" color="default">
						{version}
					</Chip>
				</div>
				<Button
					className="shrink-0 ml-auto"
					as="a"
					color="secondary"
					radius="full"
					size="sm"
					href={`/api/${type}/${name}.xml`}
					rel="noreferrer noopener"
					target="_blank"
					variant="flat"
					endContent={<MdRssFeed />}
					startContent={copied ? <IoClipboard /> : <IoClipboardOutline />}
					onClick={(e) => {
						e.preventDefault();
						return copy(
							`http://zealusercontributions.vercel.app/api/${type}/${name}.xml`,
						);
					}}
				>
					Feed URL
				</Button>
			</CardHeader>
			<CardBody className="px-3 py-2 text-small text-default-400">
				<ul className="grid grid-cols-4 gap-2 flex-wrap">{urls_}</ul>
			</CardBody>
			<CardFooter className="gap-3">
				<Button
					as="a"
					aria-label="Open in Dash"
					href={`dash-feed://${encodeURL(`http://zealusercontributions.vercel.app/api/${type}/${name}.xml`)}`}
					target="_blank"
					rel="noreferrer noopener"
					variant="light"
					color="secondary"
					size="sm"
					radius="full"
					className="ml-auto"
					startContent={<IoOpenOutline />}
				>
					Open in App
				</Button>
			</CardFooter>
		</Card>
	);
}
