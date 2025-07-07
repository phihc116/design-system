import { breakpoints, type Breakpoint, type Responsive } from "@props"

export function isResponsiveObject<Value extends string>(
	obj: Responsive<Value | Omit<string, Value>> | undefined
): obj is Record<Breakpoint, string> {
	return typeof obj === "object" && Object.keys(obj).some((key) => (breakpoints as readonly string[]).includes(key))
}
