import { call } from "@orpc/server";
import { router } from "@repo/api";
import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import { SignInView } from "~/views/signin";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const result = await call(router.planet.getAllPlanets, { id: "123" });

	console.log("ORPC Loader Result:", result);

	return result;
}

export default function SignIn() {
	return (
		<OrpcProvider>
			<SignInView></SignInView>
		</OrpcProvider>
	);
}
