import type { MarginProps } from "@props"

export function extractMarginProps<T extends MarginProps>(props: T) {
	const { m, mx, my, mt, mr, mb, ml, ...rest } = props
	return { m, mx, my, mt, mr, mb, ml, rest }
}
