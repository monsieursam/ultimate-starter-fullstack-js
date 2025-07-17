import { useMutation } from "@tanstack/react-query";
import { orpcClient } from "~/lib/orpc/client";

export default function DashboardView() {
	// Create a new planete

	const mutation = useMutation(
		orpcClient.planet.createOnePlanet.mutationOptions({
			onSuccess: (data) => {
				console.log(data);
			},
		}),
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
			{/* Add more dashboard content here */}
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
