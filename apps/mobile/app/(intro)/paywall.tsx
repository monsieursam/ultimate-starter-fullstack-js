import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Paywall() {
	return (
		<View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
			<StatusBar style="dark" />
			<Stack
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
					animation: "slide_from_right",
				}}
			/>
		</View>
	);
}
