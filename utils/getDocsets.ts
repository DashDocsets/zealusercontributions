import { cache } from "react";
import { CDNs } from "./constants";
import { isEmpty } from "./isEmpty";
import { isUndefined } from "./isUndefined";

export const getDocsets = cache(async (filterName?: string) => {
	const response = await fetch(
		"https://kapeli.com/feeds/zzz/user_contributed/build/index.json",
	);

	const data = await response.json();
	//   return data;
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
			return `https://${city}kapeli.com/feeds/zzz/user_contributed/build/${key}/${val.archive}`;
		});

		return object;
	});

	return list;
});

export const getAllDocsets = cache(async () => {
	const response = await fetch(
		"https://kapeli.com/feeds/zzz/user_contributed/build/index.json",
	);

	const data = await response.json();
	//   return data;
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
			return `https://${city}kapeli.com/feeds/zzz/user_contributed/build/${key}/${val.archive}`;
		});

		return object;
	});

	return list;
});
