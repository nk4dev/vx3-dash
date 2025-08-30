"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	const privateData = useQuery(trpc.privateData.queryOptions());

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
		<div>
			<h1>{session?.user.name}'s Dashboard</h1>
			<p>privateData: {privateData.data?.message}</p>
			<div className="py-4 px-1">
				<h2 className="font-bold text-2xl">Apps</h2>
			</div>
		</div>
	);
}
