import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useEffect } from "react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { useColorScheme } from "@/hooks/useColorScheme";
import { OrpcProvider } from "@/lib/orpc/orpc-provider";

Purchases.configure({ apiKey: "appl_lJyjFbMjyblaHlwZjzHuiESsBwn" });

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<OrpcProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="(intro)" options={{ headerShown: false }} />
					<Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</OrpcProvider>
	);
}
