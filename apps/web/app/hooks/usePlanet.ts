import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpcClient } from "~/lib/orpc/orpc-client";

export const usePlanet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		orpcClient.planet.createOnePlanet.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: orpcClient.planet.key(),
				});
			},
		}),
	);

	return {
		createPlanet: mutation.mutateAsync,
		isPending: mutation.isPending,
	};
};
