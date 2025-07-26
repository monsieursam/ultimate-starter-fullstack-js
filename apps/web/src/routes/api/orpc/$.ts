import { RPCHandler } from "@orpc/server/fetch";
import { router } from "@repo/api";
import { createServerFileRoute } from "@tanstack/react-start/server";

const handler = new RPCHandler(router);

export const ServerRoute = createServerFileRoute("/api/orpc/$").methods({
	GET: ({ request }) => {
		return handleRequest(request);
	},
	POST: ({ request }) => {
		return handleRequest(request);
	},
});

async function handleRequest(request: Request) {
	const { response } = await handler.handle(request, {
		prefix: "/api/orpc", // Ensure this matches your route prefix
		context: {
			headers: request.headers,
		},
	});

	return response ?? new Response("Not Found", { status: 404 });
}
