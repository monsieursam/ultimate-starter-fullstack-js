import { call } from "@orpc/server";
import { router } from "@repo/api";
import type { Subscription } from "@repo/database";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
	"/api/webhooks/revenuecat",
).methods({
	GET: ({ request }) => {
		// const data = request.body as Subscription | null;

		// if (!data) {
		// 	return request;
		// }

		// call(router.subscriptions.saveSubscription, {
		// 	revenueCatCustomerId: data.revenueCatCustomerId,
		// 	status: data.status,
		// 	expiration_at: data.expiration_at,
		// 	last_transaction_id: data.last_transaction_id,
		// 	product_id: data.product_id,
		// });

		console.log(request);

		return request;
	},
	POST: ({ request }) => {
		console.log(request);

		return request;
	},
});
