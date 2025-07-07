/// <reference types="vitest/config" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: "./tsconfig.json",
			entryRoot: "src",
			outDir: "dist",
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
		target: "esnext",
		lib: {
			entry: path.resolve(dirname, "src/index.ts"),
			name: "herond-design-system",
			fileName: (format) => `index.${format}.js`,
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: (id) => /^react$|^react-dom$|^clsx$/.test(id) || id.includes("node_modules"),
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				entryFileNames: "[name].[format].js",
				globals: { react: "React", "react-dom": "ReactDOM" },
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
})
