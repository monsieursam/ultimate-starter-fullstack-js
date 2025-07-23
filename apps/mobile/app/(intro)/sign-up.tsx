import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { authClient } from "@/lib/auth/auth-client";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignUp = async () => {
		// Implement your sign-up logic here
		try {
			await authClient.signUp.email({
				email,
				password,
				name,
			});
			router.replace("/(dashboard)");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.content}>
				<Text style={styles.title}>Create Account</Text>
				<Text style={styles.subtitle}>
					Join our community of AI image creators
				</Text>

				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Full Name"
						placeholderTextColor="#666"
						autoCapitalize="words"
						value={name}
						onChangeText={setName}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						placeholderTextColor="#666"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						placeholderTextColor="#666"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder="Confirm Password"
						placeholderTextColor="#666"
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>

					<TouchableOpacity style={styles.button} onPress={handleSignUp}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>

					<View style={styles.signinContainer}>
						<Text style={styles.signinText}>Already have an account? </Text>
						<Link href="/sign-in" asChild>
							<TouchableOpacity>
								<Text style={styles.signinLink}>Sign In</Text>
							</TouchableOpacity>
						</Link>
					</View>

					<Text style={styles.termsText}>
						By signing up, you agree to our Terms of Service and Privacy Policy
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		width: width > 500 ? 500 : width,
		alignSelf: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 40,
	},
	form: {
		width: "100%",
	},
	input: {
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		padding: 15,
		marginBottom: 15,
		fontSize: 16,
		color: "#333",
	},
	button: {
		backgroundColor: "#4A90E2",
		borderRadius: 12,
		padding: 15,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
	signinContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	signinText: {
		color: "#666",
		fontSize: 14,
	},
	signinLink: {
		color: "#4A90E2",
		fontSize: 14,
		fontWeight: "600",
	},
	termsText: {
		color: "#666",
		fontSize: 12,
		textAlign: "center",
	},
});
