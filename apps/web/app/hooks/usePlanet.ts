import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpcClient } from "~/lib/orpc/orpc-client";

export const usePlanet = () => {
	const queryClient = useQueryClient();

	const query = useQuery(orpcClient.planets.getAllPlanets.queryOptions());

	const mutation = useMutation(
		orpcClient.planets.createOnePlanet.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: orpcClient.planets.key(),
				});
			},
		}),
	);

	return {
		allPlanets: query.data,
		isLoadingAllPlanets: query.isLoading,
		isErrorAllPlanets: query.isError,
		errorAllPlanets: query.error,
		createPlanet: mutation.mutate,
		isPendingCreatePlanet: mutation.isPending,
		isErrorCreatePlanet: mutation.isError,
		errorCreatePlanet: mutation.error,
	};
};
