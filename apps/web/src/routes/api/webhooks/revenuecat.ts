import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
	"/api/webhooks/revenuecat",
).methods({
	GET: ({ request }) => {
		console.log(request);
	},
	POST: ({ request }) => {
		console.log(request);
	},
});
