import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "node:path"
import { fileURLToPath } from "node:url"
import dts from "vite-plugin-dts"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: "./tsconfig.json",
			entryRoot: "src",
			outDir: "dist/esm",
			copyDtsFiles: true,
		}),
	],
	resolve: {
		alias: {
			"@components": path.resolve(dirname, "src/components"),
			"@helpers": path.resolve(dirname, "src/helpers"),
			"@props": path.resolve(dirname, "src/props"),
		},
	},
	build: {
		outDir: "dist/esm",
		target: "es2020",
		minify: true,
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			formats: ["es"],
			fileName: "index",
		},
		rollupOptions: {
			external: (id) => /^react$|^react-dom$|^clsx$/.test(id) || id.includes("node_modules"),
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				entryFileNames: "[name].js",
				globals: { react: "React", "react-dom": "ReactDOM" },
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
})
