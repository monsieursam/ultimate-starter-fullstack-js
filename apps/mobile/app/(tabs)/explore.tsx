import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authClient } from "@/lib/auth/auth-client";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSignUp = async () => {
		if (!email || !password || !name) {
			setError("Please fill in all fields");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await authClient.signUp.email({
				email,
				password,
				name,
				callbackURL: "/(dashboard)",
			});
			router.push("/(dashboard)");
		} catch (error) {
			setError("Sign up failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={name}
					onChangeText={setName}
					autoCapitalize="words"
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				<TouchableOpacity 
					style={[styles.button, loading && styles.buttonDisabled]}
					onPress={handleSignUp}
					disabled={loading}
				>
					<Text style={styles.buttonText}>
						{loading ? "Signing up..." : "Sign Up"}
					</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account? </Text>
					<Link href="/" style={styles.footerLink}>
						Sign In
					</Link>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	formContainer: {
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
		gap: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 12,
		borderRadius: 8,
		fontSize: 16,
	},
	button: {
		backgroundColor: '#2563eb',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	errorText: {
		color: '#dc2626',
		fontSize: 14,
		marginTop: 4,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
	footerText: {
		color: '#666',
		fontSize: 14,
	},
	footerLink: {
		color: '#2563eb',
		fontSize: 14,
		fontWeight: '600',
	},
});
