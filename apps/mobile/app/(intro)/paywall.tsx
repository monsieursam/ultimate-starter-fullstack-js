// import { Stack, useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import { Platform, Text, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

// // export default function Paywall() {
// // 	const router = useRouter();

// // 	useEffect(() => {
// // 		Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

// // 		if (Platform.OS === "ios") {
// // 			Purchases.configure({ apiKey: "revenuecat_project_apple_api_key" });
// // 		} else if (Platform.OS === "android") {
// // 			Purchases.configure({ apiKey: "revenuecat_project_google_api_key" });
// // 		}

// // 		const getCustomerInfo = async () => {
// // 			const customerInfo = await Purchases.getCustomerInfo();
// // 			console.log("customerInfo", customerInfo);
// // 		};
// // 	}, []);

// // 	return (
// // 		<View style={{ flex: 1 }}>
// // 			<RevenueCatUI.Paywall
// // 				onDismiss={() => {
// // 					router.push("/(dashboard)");
// // 				}}
// // 			/>
// // 		</View>
// // 	);
// // }

// function PaywallScreen() {
// 	const router = useRouter();

// 	console.log("yoooo");

// 	useEffect(() => {
// 		Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

// 		if (Platform.OS === "ios") {
// 			Purchases.configure({ apiKey: "revenuecat_project_apple_api_key" });
// 		} else if (Platform.OS === "android") {
// 			Purchases.configure({ apiKey: "revenuecat_project_google_api_key" });
// 		}

// 		const getCustomerInfo = async () => {
// 			const customerInfo = await Purchases.getCustomerInfo();
// 			console.log("customerInfo", customerInfo);
// 		};
// 	}, []);

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<RevenueCatUI.Paywall
// 				onDismiss={() => {
// 					router.push("/(dashboard)");
// 				}}
// 			/>
// 		</View>
// 	);
// }

// export default PaywallScreen;

import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Paywall = () => {
	const router = useRouter();

	return (
		<View style={{ flex: 1 }}>
			<RevenueCatUI.Paywall
				onDismiss={() => {
					router.push("/(dashboard)");
				}}
			/>
		</View>
	);
};

export default Paywall;
