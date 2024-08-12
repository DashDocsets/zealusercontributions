export function xmlify(
	list: Array<{
		name: string;
		urls: string[];
		specific_versions?: Array<{ version: string }>;
		version?: string;
	}>,
) {
	return (list || [])
		.map((docset) => {
			const urls = (docset.urls || [])
				.map((url) => {
					return `    <url>${url}</url>`;
				})
				.join("\n");
			const other = docset.specific_versions
				? docset.specific_versions
						.map((v) => {
							return `        <version><name>${v.version}</name></version>`;
						})
						.join("\n")
				: "";

			return `\
          <entry>
            <name>${docset.name}</name>
            <version>${docset.version}</version>
          ${urls}
		  ${
				other
					? `<other-versions>
          ${other}
            </other-versions>`
					: ""
			}
          </entry>`;
		})
		.join("\n")
		.trim();
}
