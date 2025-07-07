// @ts-check
import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import jsxA11y from "eslint-plugin-jsx-a11y"
import storybook from "eslint-plugin-storybook"
import { globalIgnores } from "eslint/config"

export default tseslint.config([
	// Ignore generated folders
	globalIgnores(["dist", "node_modules"]),

	{
		files: ["**/*.stories.@(ts|tsx)"],
		extends: [storybook.configs["flat/recommended"]],
		rules: {
			"storybook/default-exports": "error",
		},
	},

	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			"jsx-a11y": jsxA11y,
		},
		// Extend recommended sets
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs["recommended-latest"],
			reactRefresh.configs.vite,
			storybook.configs["flat/recommended"],
		],
		rules: {
			// TypeScript
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-use-before-define": [
				"warn",
				{
					functions: false,
					classes: false,
					variables: false,
					typedefs: false,
				},
			],
			"@typescript-eslint/no-unused-expressions": [
				"warn",
				{
					allowShortCircuit: true,
					allowTernary: true,
					allowTaggedTemplates: true,
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],

			// A11y
			...jsxA11y.flatConfigs.recommended.rules,
			"jsx-a11y/label-has-associated-control": "off",

			// JS base
			"no-empty": "off",
			"prefer-const": "off",
			"no-irregular-whitespace": "off",

			// React
			"react-refresh/only-export-components": "off",

			"storybook/default-exports": "off",
			"storybook/prefer-pascal-case": "off",
		},
	},
])
