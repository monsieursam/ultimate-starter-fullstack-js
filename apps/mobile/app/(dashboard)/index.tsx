import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { usePlanet } from "@/hooks/usePlanet";
import { authClient } from "@/lib/auth/auth-client";

export default function Dashboard() {
	const {
		allPlanets,
		createPlanet,
		isLoadingAllPlanets,
		isPendingCreatePlanet,
	} = usePlanet();

	return (
		<View>
			<Button
				title="Create Planet"
				onPress={() => createPlanet({ name: "Planet 1" })}
			/>
			{isPendingCreatePlanet && <Text>Creating Planet...</Text>}
			{isLoadingAllPlanets && <Text>Loading Planets...</Text>}
			{allPlanets?.map((planet) => (
				<Text key={planet.id}>{planet.name}</Text>
			))}
		</View>
	);
}
