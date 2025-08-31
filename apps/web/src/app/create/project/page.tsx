"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!session && !isPending) {
            router.push("/login?redirect=/create/project");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-2">
            <div className="text-2xl font-bold mb-4">
                create project
            </div>
            <form>
                <input type="text" placeholder="Project Name" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}