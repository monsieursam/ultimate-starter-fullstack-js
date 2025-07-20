import { useState } from "react";
import { Link } from "react-router";
import { authClient } from "~/lib/auth/auth-client";

export function SignInView() {
	return <SignInForm />;
}

function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		await authClient.signIn.email({
			email,
			password,
			callbackURL: "/dashboard",
		});
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		setError(null);
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};

	return (
		<form onSubmit={handleSignIn} className="space-y-4 max-w-sm mx-auto">
			<div>
				<label htmlFor="email" className="block mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border px-3 py-2 w-full rounded"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block mb-1">
					Password
				</label>
				<input
					id="password"
					type="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border px-3 py-2 w-full rounded"
				/>
			</div>
			{error && <div className="text-red-600">{error}</div>}
			<button
				type="submit"
				disabled={loading}
				className="w-full bg-blue-600 text-white py-2 rounded"
			>
				{loading ? "Signing in..." : "Sign In"}
			</button>
			<div className="text-center my-2">or</div>
			<button
				type="button"
				onClick={handleGoogleSignIn}
				disabled={loading}
				className="w-full bg-gray-200 text-black py-2 rounded"
			>
				Sign in with Google
			</button>

			<div className="text-center mt-4">
				Don't have an account?{" "}
				<Link to="/signup" className="text-blue-600">
					Sign Up
				</Link>
			</div>
		</form>
	);
}
