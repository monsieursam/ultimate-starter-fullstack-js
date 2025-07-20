import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@repo/api";

const link = new RPCLink({
	url: "http://localhost:5173/api/orpc",
});

// Create a client for your router
const client: RouterClient<typeof router> = createORPCClient(link);

export const orpcClient = createTanstackQueryUtils(client);
