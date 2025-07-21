import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
		},
	},
});

export function OrpcProvider(props: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
