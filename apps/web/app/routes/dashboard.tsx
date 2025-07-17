import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import DashboardView from "~/views/dashboard";

export default function Dashboard() {
	return (
		<OrpcProvider>
			<DashboardView />
		</OrpcProvider>
	);
}
