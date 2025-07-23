import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authClient } from "@/lib/auth/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleLogin = async () => {
		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await authClient.signIn.email({
				email,
				password,
			});
			router.push("/(dashboard)");
		} catch (error) {
			setError("Invalid credentials");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		setError(null);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/(dashboard)",
			});
		} catch (error) {
			setError("Google sign-in failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
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
					onPress={handleLogin}
					disabled={loading}
				>
					<Text style={styles.buttonText}>
						{loading ? "Signing in..." : "Sign In"}
					</Text>
				</TouchableOpacity>

				<View style={styles.divider}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>or</Text>
					<View style={styles.dividerLine} />
				</View>

				<TouchableOpacity 
					style={[styles.googleButton, loading && styles.buttonDisabled]}
					onPress={handleGoogleSignIn}
					disabled={loading}
				>
					<Text style={styles.googleButtonText}>
						Sign in with Google
					</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account? </Text>
					<Link href="/explore" style={styles.footerLink}>
						Sign Up
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
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 16,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#ddd',
	},
	dividerText: {
		marginHorizontal: 8,
		color: '#666',
	},
	googleButton: {
		backgroundColor: '#f3f4f6',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: 'center',
	},
	googleButtonText: {
		color: '#000',
		fontSize: 16,
		fontWeight: '600',
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
