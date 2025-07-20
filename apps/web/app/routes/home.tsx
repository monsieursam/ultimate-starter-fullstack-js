import { call } from "@orpc/server";
import { router } from "@repo/api";
import { OrpcProvider } from "~/lib/orpc/orpc-provider";
import { HomeView } from "~/views/home";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Ultimate Starter Fullstack JS" },
		{
			name: "description",
			content: "A modern, full-stack JavaScript application starter",
		},
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const result = await call(router.planets.getAllPlanets, {});

	return result;
}

export default function Home() {
	return (
		<OrpcProvider>
			<HomeView />
		</OrpcProvider>
	);
}
