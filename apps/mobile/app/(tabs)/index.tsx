import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { authClient } from "@/lib/auth/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		if (!email || !password) {
			return;
		}
		try {
			await authClient.signIn.email({
				email,
				password,
			});
			router.push("/(dashboard)");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
}
