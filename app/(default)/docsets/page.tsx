import DocsetsGrid from "@/components/DocsetsGrid";
import Title from "@/components/Title";

export const revalidate = 300;

export default async function Docsets() {
	return (
		<>
			<div className="min-h-56 flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-8 shadow-md mx-4">
				<h2 className="text-white text-3xl font-bold text-center">
					If you're using{" "}
					<a
						href="https://kapeli.com/dash"
						target="_blank"
						rel="noreferrer noopener"
						className="drop-shadow-xl hover:text-white/60 transition-colors"
					>
						Dash
					</a>{" "}
					you already have available this docsets in your docs App
				</h2>
				<p className="text-white/80 text-xl text-center mt-4">
					Based on{" "}
					<a
						href="https://github.com/Kapeli/Dash-User-Contributions"
						rel="noreferrer noopener"
						target="_blank"
						className="font-mono font-semibold p-2 rounded-md bg-white/10 text-white"
					>
						Kapeli/Dash-User-Contributions
					</a>
				</p>
				<p className="text-white/60 text-md text-center mt-4">
					When using Zeal or Velocity, you can also use this feeds to install
					docsets.
				</p>
			</div>
			<Title id="docsets" text="Docsets" />
			{/* @ts-expect-error Server Component */}
			<DocsetsGrid />
		</>
	);
}
