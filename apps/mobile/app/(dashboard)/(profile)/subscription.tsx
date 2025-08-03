import * as Linking from "expo-linking";
import { useEffect } from "react";

import { Platform, Text, View } from "react-native";
import Purchases from "react-native-purchases";

export default function SubscriptionScreen() {
	useEffect(() => {
		const init = async () => {
			const customerInfo = await Purchases.getCustomerInfo();

			if (Platform.OS === "ios") {
				// This URL opens the Apple subscription management UI
				Linking.openURL("https://apps.apple.com/account/subscriptions");
			}
		};

		init();
	}, []);

	return (
		<View>
			<Text>SubscriptionScreen</Text>
		</View>
	);
}
