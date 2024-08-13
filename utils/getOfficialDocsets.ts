import { load } from "cheerio";
import { CDNs } from "./constants";
import { isEmpty } from "./isEmpty";
import { isUndefined } from "./isUndefined";

const getOfficialList = async () => {
	const result = await fetch(
		"https://cdn.jsdelivr.net/gh/Kapeli/feeds@master/",
	);
	const text = await result.text();
	const $ = load(text);
	const list = Array.from(
		$(".listing table tbody tr td.name a").map(function () {
			return $(this).text();
		}),
	).filter((item) => item.endsWith(".xml"));
	return list;
};

const getOfficialListInJSON = async () => {
	const list = await getOfficialList();
	const docsets = list.reduce((acc, item) => {
		const name = item.replace(".xml", "");
		acc[name] = {
			name,
			author: {
				name: "Kapeli",
				link: "https://github.com/Kapeli",
			},
			alises: [name, name?.toLocaleLowerCase()],
			urls: [`https://cdn.jsdelivr.net/gh/Kapeli/feeds@master/${item}`],
			archive: item?.replace(".xml", ".tgz"),
		};
		return acc;
	}, {});
	return { docsets };
};

export const getOfficialDocsets = async (filterName?: string) => {
	const data = await getOfficialListInJSON();
	let docsets: Record<
		string,
		{
			name: string;
			urls: string[];
			archive: string;
		}
	>;

	if (isUndefined(filterName) || isEmpty(filterName)) {
		docsets = data.docsets;
	} else {
		const t = {};
		if (
			isUndefined(data.docsets[filterName]) ||
			isEmpty(data.docsets[filterName])
		) {
			t[filterName] = {};
		} else {
			t[filterName] = data.docsets[filterName];
		}
		docsets = t;
	}

	const list = Object.keys(docsets).map((key) => {
		const val = docsets[key];
		const object = { ...val };
		object.name = key;
		object.urls = CDNs.map((city) => {
			return `https://${city}kapeli.com/feeds/${val.archive}`;
		});

		return object;
	});

	return list;
};

export const getAllOfficialDocsets = async () => {
	const data = await getOfficialListInJSON();
	const docsets: Record<
		string,
		{
			name: string;
			urls: string[];
			archive: string;
		}
	> = data.docsets;

	const list = Object.keys(docsets).map((key) => {
		const val = docsets[key];
		const object = { ...val };
		object.name = key;
		object.urls = CDNs.map((city) => {
			return `https://${city}kapeli.com/feeds/${val.archive}`;
		});

		return object;
	});

	return list;
};
