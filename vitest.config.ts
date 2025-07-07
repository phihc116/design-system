import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./.storybook/vitest.setup.ts",
			projects: [
				{
					plugins: [
						storybookTest({
							configDir: path.join(dirname, ".storybook"),
						}),
					],
					test: {
						name: "storybook",
						browser: {
							enabled: true,
							provider: "playwright",
							headless: true,
							instances: [{ browser: "chromium" }],
						},
					},
				},
			],
		},
	})
)
