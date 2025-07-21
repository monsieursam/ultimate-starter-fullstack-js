import { usePlanet } from "~/hooks/usePlanet";
import { authClient } from "~/lib/auth/auth-client";

export default function DashboardView() {
	const session = authClient.useSession();
	console.log(session);
	const { allPlanets, createPlanet, isPendingCreatePlanet } = usePlanet();

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Dashboard</h2>
			<div className="mb-6">
				<p className="text-gray-600">Welcome, {session.data?.user.email}</p>
			</div>
			<div>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Planets</h3>
					<button
						type="button"
						onClick={() => createPlanet({ name: "New Planet" })}
						disabled={isPendingCreatePlanet}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
					>
						{isPendingCreatePlanet ? "Creating..." : "Create Planet"}
					</button>
				</div>
				<ul className="space-y-2">
					{allPlanets?.map((planet) => (
						<li key={planet.id} className="p-3 bg-gray-50 rounded">
							{planet.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
