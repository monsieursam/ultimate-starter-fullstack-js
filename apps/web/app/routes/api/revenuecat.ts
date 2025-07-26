import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export async function loader(args: LoaderFunctionArgs) {
	return handleRequest(args);
}

export async function action(args: ActionFunctionArgs) {
	return handleRequest(args);
}

interface RevenueCatWebhookEvent {
	api_version: string;
	event: {
		id: string;
		type: string;
		app_user_id: string;
		original_app_user_id: string;
		product_id?: string;
		entitlement_ids?: string[];
		purchased_at_ms?: number;
		expiration_at_ms?: number;
		cancel_reason?: string;
		environment: "PRODUCTION" | "SANDBOX";
	};
}

const handleRequest = async (args: LoaderFunctionArgs | ActionFunctionArgs) => {
	const { request } = args;
	const { headers } = request;
	const authHeader = headers.get("Authorization");

	const expectedAuth = process.env.REVENUECAT_WEBHOOK_SECRET;

	if (!authHeader || authHeader !== expectedAuth) {
		console.log("Unauthorized webhook request");
		return new Response("Unauthorized", { status: 401 });
	}

	const event: RevenueCatWebhookEvent | null = request.body;

	if (!event) {
		console.log("Invalid webhook request");
		return new Response("Invalid webhook request", { status: 400 });
	}

	const { app_user_id, original_app_user_id, type } = event.event;
};
