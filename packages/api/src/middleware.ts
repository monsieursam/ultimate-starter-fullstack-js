import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
import { auth } from "@repo/auth";
import { db, schema } from "@repo/database";
import axios from "axios";
import { eq } from "drizzle-orm";

export const authMiddleware = os
	.$context<{ headers?: Headers }>() // <-- define dependent-context
	.middleware(async ({ context, next }) => {
		const authSession = await auth.api.getSession({
			headers: context.headers ? context.headers : new Headers(),
		});

		const user = authSession?.user || null;

		if (user) {
			return next({ context: { user } });
		}

		throw new ORPCError("UNAUTHORIZED");
	});

export const revenueCatMiddleware = os
	.$context<{ headers?: Headers }>() // <-- define dependent-context
	.middleware(async ({ context, next }) => {
		const authSession = await auth.api.getSession({
			headers: context.headers ? context.headers : new Headers(),
		});

		const user = authSession?.user || null;

		const response = await axios.get(
			`https://api.revenuecat.com/v1/subscribers/${user?.id}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.REVENUECAT_SECRET_KEY}`,
					"Content-Type": "application/json",
				},
			},
		);

		const entitlements = response.data.subscriber.entitlements;

		if (user) {
			return next({ context: { user } });
		}

		throw new ORPCError("UNAUTHORIZED");
	});
