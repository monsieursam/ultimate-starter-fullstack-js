import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	/// Enable cors for development
	server: {
		cors: {
			origin: "http://localhost:8081",
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		},
	},
});
