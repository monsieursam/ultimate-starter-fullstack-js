import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
import { auth } from "@repo/auth";
import { db, schema } from "@repo/database";
import { eq } from "drizzle-orm";

const { users, subscriptions } = schema;

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

export const requireActiveSubscription = os
	.$context<{
		headers: Headers;
	}>()
	.middleware(async ({ context, next }) => {
		const revenueCatCustomerId = context.headers.get("x-revenuecat-user-id");

		if (!revenueCatCustomerId) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "RevenueCat user ID required",
			});
		}

		// Check for active subscription in database
		const userWithSubscription = await db
			.select({
				userId: users.id,
				revenueCatUserId: users.revenueCatCustomerId,
				subscriptionActive: subscriptions.isActive,
				expiresAt: subscriptions.expiresAt,
			})
			.from(users)
			.leftJoin(
				subscriptions,
				eq(users.revenueCatCustomerId, subscriptions.revenueCatCustomerId),
			)
			.where(eq(users.revenueCatCustomerId, revenueCatCustomerId))
			.limit(1);

		if (!userWithSubscription) {
			throw new ORPCError("NOT_FOUND", {
				message: "User not found",
			});
		}

		const user = userWithSubscription[0];
		const hasActiveSubscription =
			user?.subscriptionActive &&
			(!user.expiresAt || user.expiresAt > new Date());

		if (!hasActiveSubscription) {
			// Optionally verify with RevenueCat API for real-time status
			const isActiveOnRevenueCat =
				await verifySubscriptionWithRevenueCat(revenueCatUserId);

			if (!isActiveOnRevenueCat) {
				throw new ORPCError("FORBIDDEN", {
					message: "Active subscription required",
				});
			}
		}

		return next({
			context: {
				user: {
					id: user.userId,
					revenueCatUserId: user.revenueCatUserId,
					hasActiveSubscription: true,
				},
			},
		});
	});
