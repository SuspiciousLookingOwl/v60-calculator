import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import svgString from "./plugins/svgString";

export default defineConfig({
	base: "./",
	plugins: [solidPlugin(), svgString()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
});
