import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	route("/api/auth/*", "routes/api/auth.ts"),
	route("/api/orpc/*", "routes/api/orpc.ts"),

	route("/signup", "routes/signup.tsx"),
	route("/dashboard", "routes/dashboard.tsx"),

	index("routes/home.tsx"),
] satisfies RouteConfig;
