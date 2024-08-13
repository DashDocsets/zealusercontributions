import GeneratedGrid from "@/components/GeneratedGrid";
import Title from "@/components/Title";

export const revalidate = 300;

export default async function Official() {
	return (
		<>
			<div className="h-56 flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-8 shadow-md">
				<h2 className="text-white text-3xl font-bold text-center">
					Generated Extra-Docsets not in Official or User Contributions.
				</h2>
				<p className="text-white/80 text-xl text-center mt-4">
					Based on{" "}
					<a
						href="https://github.com/DashDocsets/docsets"
						rel="noreferrer noopener"
						target="_blank"
						className="font-mono font-semibold p-2 rounded-md bg-white/10 text-white"
					>
						DashDocsets/docsets
					</a>
				</p>
				<p className="text-white/60 text-md text-center mt-4">
					When using Dash, Zeal or Velocity, use Feed URL to install docsets.
					<br /> On Dash you can also click on "Open in App" to automatically
					open the docset in Dash.
				</p>
			</div>
			<Title id="geneted" text="Generated Docsets" />
			{/* @ts-expect-error Server Component */}
			<GeneratedGrid />
		</>
	);
}
