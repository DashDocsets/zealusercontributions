import { isEmpty } from "./isEmpty";
import { isUndefined } from "./isUndefined";

export async function getGeneratedDocsets(filterName?: string) {
	const response = await fetch(
		// "https://cdn.jsdelivr.net/gh/DashDocsets/docsets@master/docsets.json",
		"https://raw.githubusercontent.com/DashDocsets/docsets/master/docsets.json",
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
		object.urls = [
			// `https://cdn.jsdelivr.net/gh/DashDocsets/docsets@master/docsets/${key}.tgz`,
			`https://raw.githubusercontent.com/DashDocsets/docsets/master/docsets/${key}.tgz`,
			// GIT LFS
			// `https://media.githubusercontent.com/media/DashDocsets/docsets/master/docsets/${key}.tgz`,
		];

		return object;
	});

	return list;
}

export async function getAllGeneratedDocsets() {
	const response = await fetch(
		// "https://cdn.jsdelivr.net/gh/DashDocsets/docsets@master/docsets.json",
		"https://raw.githubusercontent.com/DashDocsets/docsets/master/docsets.json",
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
		object.urls = [
			// `https://cdn.jsdelivr.net/gh/DashDocsets/docsets@master/docsets/${key}.tgz`,
			`https://raw.githubusercontent.com/DashDocsets/docsets/master/docsets/${key}.tgz`,
			// GIT LFS
			// `https://media.githubusercontent.com/media/DashDocsets/docsets/master/docsets/${key}.tgz`,
		];

		return object;
	});

	return list;
}
