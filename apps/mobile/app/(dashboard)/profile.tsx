import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { authClient } from "@/lib/auth/auth-client";

const MENU_ITEMS = [
	{ id: "account", title: "Account Settings", icon: "person" as const },
	{
		id: "subscription",
		title: "Subscription",
		icon: "card" as const,
		screen: "subscription",
	},
	// {
	// 	id: "notifications",
	// 	title: "Notifications",
	// 	icon: "notifications" as const,
	// },
	// { id: "appearance", title: "Appearance", icon: "color-palette" as const },
	{ id: "help", title: "Help & Support", icon: "help-circle" as const },
	{ id: "about", title: "About", icon: "information-circle" as const },
];

export default function ProfileScreen() {
	const session = authClient.useSession();
	const router = useRouter();

	const handleSignOut = async () => {
		// Implement sign out logic here
		await authClient.signOut();
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Image
					source={{
						uri: session?.data?.user?.image || "https://picsum.photos/200",
					}}
					style={styles.avatar}
				/>
				<Text style={styles.name}>{session?.data?.user?.name}</Text>
				<Text style={styles.email}>{session?.data?.user?.email}</Text>
				<View style={styles.stats}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>42</Text>
						<Text style={styles.statLabel}>Images</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>15</Text>
						<Text style={styles.statLabel}>Edits</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>3</Text>
						<Text style={styles.statLabel}>Collections</Text>
					</View>
				</View>
			</View>

			<View style={styles.menuContainer}>
				{MENU_ITEMS.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={styles.menuItem}
						onPress={() => {
							router.push("/(dashboard)/(profile)/subscription");
						}}
					>
						<View style={styles.menuItemLeft}>
							<Ionicons name={item.icon} size={24} color="#333" />
							<Text style={styles.menuItemText}>{item.title}</Text>
						</View>
						<Ionicons name="chevron-forward-outline" size={20} color="#999" />
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
				<Ionicons name="log-out-outline" size={24} color="#FF3B30" />
				<Text style={styles.signOutText}>Sign Out</Text>
			</TouchableOpacity>

			<Text style={styles.version}>Version 1.0.0</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		backgroundColor: "#f5f5f5",
	},
	header: {
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 15,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	email: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
	stats: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingVertical: 15,
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
	},
	statDivider: {
		width: 1,
		height: 30,
		backgroundColor: "#ddd",
	},
	menuContainer: {
		backgroundColor: "#fff",
		marginTop: 20,
		borderRadius: 12,
		marginHorizontal: 10,
		overflow: "hidden",
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	menuItemLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuItemText: {
		fontSize: 16,
		color: "#333",
		marginLeft: 15,
	},
	signOutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		marginTop: 20,
		marginHorizontal: 10,
		padding: 15,
		borderRadius: 12,
	},
	signOutText: {
		fontSize: 16,
		color: "#FF3B30",
		marginLeft: 10,
		fontWeight: "500",
	},
	version: {
		textAlign: "center",
		color: "#999",
		fontSize: 14,
		marginTop: 20,
		marginBottom: 30,
	},
});
