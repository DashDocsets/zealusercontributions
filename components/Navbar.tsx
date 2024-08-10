import {
	FcApproval,
	FcBookmark,
	FcDocument,
	FcHome,
	FcInfo,
} from "react-icons/fc";

import Link from "next/link";

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
	return (
		<nav className="flex bg-gray-200 sm:sticky sm:top-0 shadow-xs z-10 py-2">
			<div className="flex flex-col sm:flex-row container mx-auto px-4">
				{!isHome && (
					<ul className="flex py-2 items-center justify-between sm:justify-center gap-4">
						<li>
							<Link
								className="flex gap-1 text-lg hover:text-blue-700 items-center"
								href="/"
							>
								<FcHome />
								<span className="hidden sm:inline">Home</span>
							</Link>
						</li>
						<li>
							<Link
								className="flex gap-1 text-lg hover:text-blue-700 items-center"
								href="/docsets"
							>
								<FcApproval />
								Docsets
							</Link>
						</li>
						<li>
							<Link
								className="flex gap-1 text-lg hover:text-blue-700 items-center"
								href="/cheatsheets"
							>
								<FcBookmark />
								Cheat Sheets
							</Link>
						</li>
						<li>
							<Link
								className="flex gap-1 text-lg hover:text-blue-700 items-center"
								href="/generated"
							>
								<FcDocument />
								Generated Docsets
							</Link>
						</li>
						<li>
							<Link
								className="flex gap-1 text-lg hover:text-blue-700 items-center"
								href="/docs"
							>
								<FcInfo />
								<span className="hidden sm:inline">Docs</span>
							</Link>
						</li>
					</ul>
				)}
				<div className="flex justify-center content-center sm:ml-auto items-center py-2 sm:py-0">
					<form action="/search" method="GET" role="search">
						<div className="relative text-gray-600">
							<input
								type="search"
								name="q"
								className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
								placeholder="Search..."
							/>
							<button
								type="submit"
								className="absolute right-0 top-0 mt-3 mr-4"
							>
								<svg
									className="h-4 w-4 fill-current"
									viewBox="0 0 56.966 56.966"
									xmlSpace="preserve"
									width="512px"
									height="512px"
								>
									<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
}
