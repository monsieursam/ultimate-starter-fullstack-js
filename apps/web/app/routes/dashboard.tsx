import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import { authMiddleware } from "~/middlewares/auth-middleware";
import DashboardView from "~/views/dashboard";

export const unstable_middleware = [authMiddleware];

export default function Dashboard() {
	return (
		<OrpcProvider>
			<DashboardView />
		</OrpcProvider>
	);
}
