import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
import { auth } from "@repo/auth";
import { db, schema } from "@repo/database";
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
