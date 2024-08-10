import GeneratedGrid from "@/components/GeneratedGrid";
import Title from "@/components/Title";

export const revalidate = 0;

export default async function Generated() {
	return (
		<>
			<Title id="geneted" text="Generated Docsets" />
			{/* @ts-expect-error Server Component */}
			<GeneratedGrid />
		</>
	);
}
