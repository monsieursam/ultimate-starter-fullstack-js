import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { authClient } from "@/lib/auth/auth-client";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { data: session, isPending } = authClient.useSession();

	if (!session && !isPending) {
		return <Redirect href={"/(dashboard)"} />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Sign In",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Sign Up",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
