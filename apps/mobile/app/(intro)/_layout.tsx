import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { authClient } from "@/lib/auth/auth-client";

export default function IntroLayout() {
	const { data, isPending } = authClient.useSession();

	if (data && !isPending) {
		return <Redirect href="/(dashboard)" />;
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
				}}
			/>
		</View>
	);
}
