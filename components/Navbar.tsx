"use client";
import {
	Button,
	Navbar as NavbarComponent,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
} from "@nextui-org/react";

import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const items = (
		<>
			<NavbarItem isActive={pathname === "/official"}>
				<Link href="/official">Official</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === "/docsets"}>
				<Link href="/docsets">User Contributions</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === "/generated"}>
				<Link href="/generated">Generated</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === "/cheatsheets"}>
				<Link href="/cheatsheets">Cheat Sheets</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === "/docs"}>
				<Link href="/docs">Docs</Link>
			</NavbarItem>
		</>
	);

	return (
		<NavbarComponent isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarBrand>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="lg:hidden mr-2 !size-6"
				/>
				<Link href="/" className="flex gap-2 items-center">
					<img
						src="/favicon-192.png"
						alt="Zeal Logo"
						className="size-8 inline"
					/>
					<p className="text-small font-bold hidden lg:flex">
						Zeal User Contributions
					</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden lg:flex gap-4" justify="center">
				{items}
			</NavbarContent>
			<NavbarContent justify="end">
				<form action="/search" method="GET" role="search">
					<div className="relative text-gray-600">
						<input
							type="search"
							name="q"
							className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
							placeholder="Search..."
						/>
						<button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
							<IoSearch />
						</button>
					</div>
				</form>
			</NavbarContent>
			<NavbarMenu>{items}</NavbarMenu>
		</NavbarComponent>
	);
}
