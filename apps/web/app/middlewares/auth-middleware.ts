import { auth } from "@repo/auth";
import type { User } from "better-auth";
import {
	redirect,
	unstable_createContext,
	type unstable_MiddlewareFunction,
} from "react-router";

export const userContext = unstable_createContext<User | null>(null);

export const authMiddleware: unstable_MiddlewareFunction = async ({
	request,
	context,
}) => {
	const authSession = await auth.api.getSession({
		headers: request.headers,
	});

	const user = authSession?.user || null;

	if (!user) {
		throw redirect("/signin");
	}

	context.set(userContext, user);
};
