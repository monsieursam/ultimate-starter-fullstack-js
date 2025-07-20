import { auth } from "@repo/auth";
import { type LoaderFunctionArgs, redirect } from "react-router";

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
};
