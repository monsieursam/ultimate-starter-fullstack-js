import { auth } from "@repo/auth";
import type { User } from "better-auth";
import {
	type LoaderFunctionArgs,
	redirect,
	unstable_createContext,
} from "react-router";

const userContext = unstable_createContext<User>();

export const authMiddleware = async ({
	request,
	context,
}: LoaderFunctionArgs) => {
	const authSession = await auth.api.getSession({
		headers: request.headers,
	});

	const user = authSession?.user || null;

	if (!user) {
		throw redirect("/signin");
	}

	const contextMap = new Map();

	contextMap.set(userContext, user);

	return contextMap;
};
