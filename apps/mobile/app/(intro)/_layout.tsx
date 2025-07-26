import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function IntroLayout() {
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
