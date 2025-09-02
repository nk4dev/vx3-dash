

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query-client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi-config';


export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					{children}
					<ReactQueryDevtools />
				</QueryClientProvider>
				<Toaster richColors />
			</ThemeProvider>
		</WagmiProvider>
	);
}
