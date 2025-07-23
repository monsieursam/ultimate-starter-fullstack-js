import * as AppleAuthentication from "expo-apple-authentication";
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

export default async function SignInScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		// Implement your sign-in logic here
		try {
			await authClient.signIn.email({
				email,
				password,
			});
			router.replace("/(dashboard)");
		} catch (error) {
			console.error(error);
		}
	};

	const handleAppleSignIn = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			// Here you would typically send the credential to your backend
			console.log("Apple Sign-In successful:", credential);

			// Save authentication state
			await authClient.signIn.social({
				provider: "apple",
				idToken: {
					token: credential.identityToken || "",
				},
			});

			// Navigate to the main app
			router.replace("/(dashboard)");
		} catch (error: any) {
			if (error.code === "ERR_CANCELED") {
				// User canceled the sign-in flow
				console.log("User canceled Apple Sign-In");
			} else {
				console.error("Apple Sign-In error:", error);
			}
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.content}>
				<Text style={styles.title}>Welcome</Text>
				<Text style={styles.subtitle}>
					Sign in to continue creating amazing AI-generated images
				</Text>

				<View style={styles.form}>
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

					<TouchableOpacity style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={handleSignIn}>
						<Text style={styles.buttonText}>Sign In</Text>
					</TouchableOpacity>
					<AppleAuthentication.AppleAuthenticationButton
						buttonType={
							AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
						}
						buttonStyle={
							AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
						}
						cornerRadius={25}
						style={styles.appleButton}
						onPress={handleAppleSignIn}
					/>
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
	appleButton: {
		width: "80%",
		height: 50,
		marginBottom: 15,
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
	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 20,
	},
	forgotPasswordText: {
		color: "#4A90E2",
		fontSize: 14,
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
	signupContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signupText: {
		color: "#666",
		fontSize: 14,
	},
	signupLink: {
		color: "#4A90E2",
		fontSize: 14,
		fontWeight: "600",
	},
});
