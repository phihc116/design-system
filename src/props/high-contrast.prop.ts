import type { PropDef } from "./prop-def"

const highContrastPropDef = {
	highContrast: {
		type: "boolean",
		className: "rt-high-contrast",
		default: undefined,
	},
} satisfies {
	highContrast: PropDef<boolean>
}

export { highContrastPropDef }
