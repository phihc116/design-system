import type { accentColors } from "@props"

type ThemeAccentColor = (typeof accentColors)[number]

export function getMatchingGrayColor(accentColor: ThemeAccentColor) {
	switch (accentColor) {
		case "red":
		case "pink":
		case "purple":
			return "mauve"
		case "indigo":
		case "blue":
		case "cyan":
			return "slate"
		case "teal":
		case "mint":
		case "green":
			return "sage"
		case "yellow":
		case "orange":
		case "brown":
		case "accent":
			return "sand"
		case "gray":
			return "gray"
	}
}
