import { auth } from "@repo/auth";
import type { LoaderFunctionArgs } from "react-router";
import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import DashboardView from "~/views/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
	const authSession = await auth.api.getSession({
		headers: request.headers,
	});

	const user = authSession?.user || null;

	if (!user) {
		throw new Response("Unauthorized", { status: 401 });
	}

	return { user };
}

export default function Dashboard() {
	return (
		<OrpcProvider>
			<DashboardView />
		</OrpcProvider>
	);
}
