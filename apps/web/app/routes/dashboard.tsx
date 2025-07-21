import type { LoaderFunctionArgs } from "react-router";
import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import { authMiddleware, userContext } from "~/middlewares/auth-middleware";
import DashboardView from "~/views/dashboard";

export const unstable_middleware = [authMiddleware];

export async function loader({ context }: LoaderFunctionArgs) {
	const user = context.get(userContext);

	return { user };
}

export default function Dashboard() {
	return (
		<OrpcProvider>
			<DashboardView />
		</OrpcProvider>
	);
}
