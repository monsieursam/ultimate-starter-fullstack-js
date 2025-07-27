import { os } from "@orpc/server";
import { db, schema } from "@repo/database";
import z from "zod";
import { authMiddleware } from "../middleware";

const { subscriptions } = schema;

export const saveSubscription = os
	.use(authMiddleware)
	.input(
		z.object({
			revenueCatCustomerId: z.string().min(1),
			status: z.string().min(1),
			expiration_at: z.string().min(1),
			last_transaction_id: z.string().min(1),
			product_id: z.string().min(1),
		}),
	)
	.handler(async ({ input }) => {
		return db.insert(subscriptions).values(input);
	});
