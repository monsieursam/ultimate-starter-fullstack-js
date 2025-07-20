import { useState } from "react";
import { authClient } from "~/lib/auth/auth-client";

export const SignUpView = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		await authClient.signUp.email({
			email, // user email address
			password, // user password -> min 8 characters by default
			name, // user display name
			callbackURL: "/dashboard",
		});
	};

	return (
		<form onSubmit={handleSignUp} className="space-y-4">
			{error && <div className="text-red-500">{error}</div>}
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				required
				className="w-full p-2 border rounded"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
				className="w-full p-2 border rounded"
			/>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				required
				className="w-full p-2 border rounded"
			/>
			<button
				type="submit"
				disabled={loading}
				className="w-full p-2 bg-blue-500 text-white rounded"
			>
				{loading ? "Signing Up..." : "Sign Up"}
			</button>
		</form>
	);
};
