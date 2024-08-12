import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider className="min-h-svh flex flex-col">
			{children}
		</NextUIProvider>
	);
}
