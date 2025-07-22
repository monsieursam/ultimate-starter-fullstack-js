import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@repo/api";
import { authClient } from "../auth/auth-client";

const link = new RPCLink({
	url: "http://localhost:5173/api/orpc",
	headers: () => {
		const headers = new Map<string, string>();
		const cookies = authClient.getCookie();
		if (cookies) {
			headers.set("Cookie", cookies);
		}

		return Object.fromEntries(headers);
	},
	// fetch: <-- provide fetch polyfill fetch if needed
});

// Create a client for your router
const client: RouterClient<typeof router> = createORPCClient(link);

export const orpcClient = createTanstackQueryUtils(client);
