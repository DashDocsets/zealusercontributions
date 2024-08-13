import { CDNs } from "./constants";
import { isEmpty } from "./isEmpty";
import { isUndefined } from "./isUndefined";
import JSON5 from "json5";
import { cache } from "react";

export const getCheatSheets = cache(async (filterName?: string) => {
	const response = await fetch(
		"https://kapeli.com/feeds/zzz/cheatsheets/cheat.json",
	);
	const text = await response.text();
	const data = JSON5.parse(text).cheatsheets || {};

	let cheatsheets = data;

	if (!isUndefined(filterName) && !isEmpty(filterName)) {
		const t = {};
		if (isUndefined(data[filterName]) || isEmpty(data[filterName])) {
			t[filterName] = {};
		} else {
			t[filterName] = data[filterName];
		}
		cheatsheets = t;
	}

	const list = Object.keys(cheatsheets).map((key) => {
		const val = cheatsheets[key];
		const object = { ...val };
		object.name = key;
		object.archive = `${key}.tgz`;
		object.urls = CDNs.map((city) => {
			return `https://${city}kapeli.com/feeds/zzz/cheatsheets/${key}.tgz`;
		});

		return object;
	});

	return list;
});

export const getAllCheatSheets = cache(async () => {
	const response = await fetch(
		"https://kapeli.com/feeds/zzz/cheatsheets/cheat.json",
	);
	const text = await response.text();
	const data = JSON5.parse(text).cheatsheets || {};

	const list = Object.keys(data).map((key) => {
		const val = data[key];
		const object = { ...val };
		object.name = key;
		object.archive = `${key}.tgz`;
		object.urls = CDNs.map((city) => {
			return `https://${city}kapeli.com/feeds/zzz/cheatsheets/${key}.tgz`;
		});

		return object;
	});

	return list;
});
