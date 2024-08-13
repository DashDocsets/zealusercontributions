import ScrollTop from "@/components/ScrollTop";
import { IoLogoGithub } from "react-icons/io5";

export default function Footer() {
	return (
		<>
			<footer className="bg-default-100 flex flex-col items-center justify-center p-4 text-center mt-auto">
				<p className="flex flex-col items-center">
					<span>
						Create by
						<a
							href="https://github.com/xantiagoma"
							className="ml-2 hover:text-blue-700"
						>
							<code>xantiagoma</code>
						</a>
					</span>
					<a
						href="https://github.com/xantiagoma/zealusercontributions"
						target="_blank"
						rel="noreferrer noopener"
						className="ml-2 hover:text-blue-700 flex gap-1 items-center"
					>
						<IoLogoGithub />
						xantiagoma/zealusercontributions
					</a>
					<a
						href="https://github.com/DashDocsets/docsets"
						target="_blank"
						rel="noreferrer noopener"
						className="ml-2 hover:text-blue-700 flex gap-1 items-center"
					>
						<IoLogoGithub />
						DashDocsets/docsets
					</a>
				</p>
				<p className="mt-2">
					Thanks to{" "}
					<a
						href="https://kapeli.com/dash"
						target="_blank"
						rel="noreferrer noopener"
						className="hover:text-blue-700"
					>
						Kapeli (Dash)
					</a>{" "}
					❤️ (CDN, Docsets, Public Feed...)
				</p>
			</footer>

			<ScrollTop />
		</>
	);
}
