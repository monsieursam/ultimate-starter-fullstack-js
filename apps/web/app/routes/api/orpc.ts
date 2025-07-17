import { RPCHandler } from "@orpc/server/fetch";
import { router } from "@repo/api";
import { auth } from "@repo/auth";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

const handler = new RPCHandler(router);

export async function loader(args: LoaderFunctionArgs) {
	return handleRequest(args);
}

export async function action(args: ActionFunctionArgs) {
	return handleRequest(args);
}

async function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
	const { response } = await handler.handle(args.request, {
		prefix: "/api/orpc", // Ensure this matches your route prefix
		context: {
			headers: args.request.headers,
		},
	});

	return response ?? new Response("Not Found", { status: 404 });
}
