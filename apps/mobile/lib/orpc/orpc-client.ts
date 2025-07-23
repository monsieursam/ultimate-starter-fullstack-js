import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@repo/api";
import { authClient } from "../auth/auth-client";

const link = new RPCLink({
	url: `${process.env.EXPO_PUBLIC_API_URL}/api/orpc`,
	headers: () => {
		const headers = new Map<string, string>();
		const cookies = authClient.getCookie();
		if (cookies) {
			headers.set("Cookie", cookies);
		}

		return Object.fromEntries(headers);
	},
});

// Create a client for your router
const client: RouterClient<typeof router> = createORPCClient(link);

export const orpcClient = createTanstackQueryUtils(client);
