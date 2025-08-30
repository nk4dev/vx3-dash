"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TITLE_TEXT = `
██╗   ██╗██╗  ██╗██████╗ 
██║   ██║╚██╗██╔╝╚════██╗
██║   ██║ ╚███╔╝  █████╔╝
╚██╗ ██╔╝ ██╔██╗  ╚═══██╗
 ╚████╔╝ ██╔╝ ██╗██████╔╝
	╚═══╝  ╚═╝  ╚═╝╚═════╝ 
`;

export default function Home() {
	const [navStatus, setNavStatus] = useState<{ f: number }>({ f: 0 });
	const [accessNavigateCookie, setAccessNavigateCookie] = useState<string | null>(null);
	const navigator = useSearchParams();
	const queryParam = navigator.get("f");

	const getCookie = (name: string): string | null => {
		if (typeof window === "undefined") {
			return null;
		}
		const nameEQ = name + "=";
		const ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};

	useEffect(() => {
		const cookieValue = getCookie("accesnavigate");
		setAccessNavigateCookie(cookieValue);

		if (queryParam === "1") {
			setCookie("accesnavigate", "1");
			setAccessNavigateCookie("1");
		} else if (cookieValue === "1") {
			setNavStatus({ f: 1 });
		}
	}, [queryParam]);

	const setCookie = (name: string, value: string, days: number = 7) => {
		const expires = new Date();
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
	};

	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span className="text-sm text-muted-foreground">
							{healthCheck.isLoading
								? "Checking..."
								: healthCheck.data
									? "Connected"
									: "Disconnected"}
						</span>
					</div>
				</section>
				{accessNavigateCookie === "1" && (
					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">Todo</h2>
						<p className="text-sm text-muted-foreground">
							What would you like to do next?
						</p>
						<div>
							<ul className="list-disc pl-5">
								<li>Create wallet app</li>
								<li>Configure vx3 settings</li>
							</ul>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

