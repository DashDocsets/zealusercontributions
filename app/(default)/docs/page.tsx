import Title from "@/components/Title";

export default function Docs() {
	return (
		<>
			<Title id="usage" text="Docs" />
			<h3 id="zeal" className="text-2xl px-4">
				Zeal
			</h3>
			<div className="px-4">
				<p>
					When using Zeal or Velocity, you can install docsets downloading them
					or copying and unsing the feed url.
				</p>
				<p>Go ➡ Settings ➡ Docsets ➡ Add feed</p>
				<p>Paste Docset / Cheatsheet XML url</p>
				<img
					src="/Zeal_Download.png"
					width="960"
					height="718"
					alt="Screenshot Zeal"
				/>
			</div>
			<h3 className="text-2xl px-4">Dash</h3>
			<div className="px-4">
				<p>
					If your using Dash, you already have access to official, user
					contributions and cheatsheets from your docs app.
				</p>
				<p>
					To install generated docsets, you can use the feed url or click on the
					"Open in App" button.
				</p>
				<img
					src="/Dash_Download.png"
					width="960"
					height="718"
					alt="Screenshot Dash"
				/>
			</div>
		</>
	);
}
