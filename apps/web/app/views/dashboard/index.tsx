import { usePlanet } from "~/hooks/usePlanet";
import { authClient } from "~/lib/auth/auth-client";

export default function DashboardView() {
	const sessions = authClient.useSession();
	const { allPlanets, isPendingCreatePlanet, createPlanet, errorCreatePlanet } =
		usePlanet();

	const handleCreatePlanet = async () => {
		await createPlanet({ name: "New Planet" });
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard!</p>
			<h1>Your account</h1>
			<p>{sessions.data?.user.email}</p>
			<h1>Planet</h1>
			<ul>
				{allPlanets?.map((planet) => (
					<li key={planet.id}>{planet.name}</li>
				))}
			</ul>

			<button
				type="button"
				onClick={handleCreatePlanet}
				disabled={isPendingCreatePlanet}
			>
				{isPendingCreatePlanet ? "Creating..." : "Create New Planet"}
			</button>
			{errorCreatePlanet && <p>Error: {errorCreatePlanet.message}</p>}
		</div>
	);
}
