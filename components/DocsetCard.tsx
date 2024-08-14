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
	IoCheckmarkCircle,
	IoPeopleCircleOutline,
	IoCloudCircleSharp,
	IoListCircle,
} from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { encodeURL } from "@/utils/encodeURL";
import { useClipboard } from "@mantine/hooks";
import Img from "./Img";
import { ImgProps } from "next/dist/shared/lib/get-img-props";

type Author = {
	name: string;
	link: string;
};

export type DocsetCardProps = {
	name: string;
	version?: string;
	"icon@2x"?: string;
	icon?: string;
	author?: Author;
	urls: Array<string>;
	type: "docsets" | "cheatsheets" | "generated" | "official";
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
}: DocsetCardProps) {
	const { copied, copy } = useClipboard({ timeout: 1000 });
	const icon = icon2x || icon1x;
	const authorName = author?.name;
	const authorLink = author?.link;
	const id: string = `${type}-${name}`;

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

	const feedURL =
		type === "official"
			? `https://raw.githubusercontent.com/Kapeli/feeds/master/${name}.xml`
			: `http://zealusercontributions.vercel.app/api/${type}/${name}.xml`;

	const fallback = (() => {
		if (type === "official") {
			return <IoCheckmarkCircle className="text-success size-10 inset-0" />;
		}
		if (type === "docsets") {
			return <IoPeopleCircleOutline className="text-primary size-10 inset-0" />;
		}
		if (type === "generated") {
			return <IoCloudCircleSharp className="text-secondary size-10 inset-0" />;
		}
		return <IoListCircle className="text-danger size-10 inset-0" />;
	})();

	return (
		<Card>
			<CardHeader className="gap-3 items-start max-w-full pt-4">
				<Avatar
					radius="full"
					className="p-1 bg-transparent shrink-0"
					isBordered
					size="md"
					src={src}
					fallback={fallback}
					ImgComponent={(props: ImgProps) => (
						<Img fallback={<div>{fallback}</div>} {...props} />
					)}
				/>
				<div className="flex flex-col gap-1 items-start justify-center max-w-full shrink-1">
					<h4 className="text-large font-semibold leading-none flex gap-1 items-center break-words">
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
					{version ? (
						<Chip
							size="sm"
							variant="flat"
							color="default"
							className="truncate max-w-28"
							classNames={{ content: "truncate max-w-28" }}
						>
							{version}
						</Chip>
					) : null}
				</div>
				<Button
					className="shrink-0 ml-auto"
					as="a"
					color="secondary"
					radius="full"
					size="sm"
					href={feedURL}
					rel="noreferrer noopener"
					target="_blank"
					variant="flat"
					endContent={<MdRssFeed />}
					startContent={copied ? <IoClipboard /> : <IoClipboardOutline />}
					onClick={(e) => {
						e.preventDefault();
						return copy(feedURL);
					}}
				>
					Feed URL
				</Button>
			</CardHeader>
			<CardBody className="px-3 py-2 text-small text-default-400">
				<ul className="grid grid-cols-4 gap-2 flex-wrap mt-auto">{urls_}</ul>
			</CardBody>
			<CardFooter className="gap-3">
				<Button
					as="a"
					aria-label="Open in Dash"
					href={`dash-feed://${encodeURL(feedURL)}`}
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
