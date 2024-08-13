import OfficialGrid from "@/components/OfficialGrid";
import Title from "@/components/Title";

export const revalidate = 300;

export default async function Generated() {
	return (
		<>
			<div className="min-h-56 flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-8 shadow-md mx-4">
				<h2 className="text-white text-3xl font-bold text-center">
					You probably already have available this docsets in your docs App
					<br />
					(Dash, Zeal, Velocity, etc.)
				</h2>
				<p className="text-white/80 text-xl text-center mt-4">
					Based on{" "}
					<a
						href="https://github.com/Kapeli/feeds"
						rel="noreferrer noopener"
						target="_blank"
						className="font-mono font-semibold p-2 rounded-md bg-white/10 text-white"
					>
						Kapeli/feeds
					</a>
				</p>
				<p className="text-white/60 text-md text-center mt-4">
					List for search purposes
				</p>
			</div>
			<Title id="geneted" text="Official Docsets" />
			{/* @ts-expect-error Server Component */}
			<OfficialGrid />
		</>
	);
}
