import { useMutation, useQuery } from "@tanstack/react-query";
import { orpcClient } from "~/lib/orpc/orpc-client";

export default function DashboardView() {
	const { data } = useQuery(orpcClient.planet.getAllPlanets.queryOptions());
	console.log("Planets Data:", data);

	const mutation = useMutation(
		orpcClient.planet.createOnePlanet.mutationOptions(),
	);

	const handleCreatePlanet = async () => {
		try {
			const newPlanet = await mutation.mutateAsync({ name: "New Planet" });
			console.log("New Planet Created:", newPlanet);
		} catch (error) {
			console.error("Error creating planet:", error);
		}
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard!</p>
			<button
				type="button"
				onClick={handleCreatePlanet}
				disabled={mutation.isPending}
			>
				{mutation.isPending ? "Creating..." : "Create New Planet"}
			</button>
			{mutation.error && <p>Error: {mutation.error.message}</p>}
		</div>
	);
}
