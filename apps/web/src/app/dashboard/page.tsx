"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	//const privateData = useQuery(trpc.privateData.queryOptions());

	useEffect(() => {
		if (!session && !isPending) {
			router.push("/login");
		}
	}, [session, isPending]);

	if (isPending) {
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
		</div>;
	}

	return (
		<div className="p-3 container mx-auto">
			<h1 className="text-3xl">{session?.user.name}'s Dashboard</h1>
			<div>
				<h2 className="text-2xl mb-2">todays balance</h2>
				<p className="text-3xl">BTC: $0.00</p>
				<p className="text-3xl">ETH: $0.00</p>
			</div>
			<div className="py-4 px-1">
				<h2 className="text-2xl mb-2">Apps</h2>
				<button
					className="text-xl border border-gray-300 rounded-md p-5"
					onClick={() => {
						router.push('/create/project' as any);
					}}
				>
					<p>Create</p>
					<p>Project</p>
				</button>
			</div>
		</div>
	);
}
