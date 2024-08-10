import { FcApproval, FcBookmark, FcDocument, FcInfo } from "react-icons/fc";

import Link from "next/link";

export default async function Index() {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-stretch mt-8 gap-4 w-full px-4">
				<Link
					className="min-w-[16rem] bg-slate-300 hover:bg-slate-900 hover:text-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 text-2xl xl:text-3xl w-full py-16"
					href="/docsets"
				>
					<FcApproval className="text-4xl flex-shrink-0" />
					<span className="truncate">Docsets</span>
				</Link>
				<Link
					className="min-w-[16rem] bg-slate-300 hover:bg-slate-900 hover:text-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-2xl xl:text-3xl w-full py-16"
					href="/cheatsheets"
				>
					<FcBookmark className="text-4xl flex-shrink-0" />
					<span className="truncate">Cheat Sheets</span>
				</Link>
				<Link
					className="min-w-[16rem] bg-slate-300 hover:bg-slate-900 hover:text-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-2xl xl:text-3xl w-full py-16"
					href="/generated"
				>
					<FcDocument className="text-4xl flex-shrink-0" />
					<span className="truncate">Generated Docsets</span>
				</Link>
				<Link
					className="min-w-[16rem] bg-slate-300 hover:bg-slate-900 hover:text-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 text-2xl xl:text-3xl w-full py-16"
					href="/docs"
				>
					<FcInfo className="text-4xl flex-shrink-0" />
					<span className="truncate">Docs</span>
				</Link>
			</div>
		</>
	);
}
