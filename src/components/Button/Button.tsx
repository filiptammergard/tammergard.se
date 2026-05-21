import type { ComponentPropsWithoutRef } from "react"
import styles from "./styles.module.css"

type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md"

interface Props extends ComponentPropsWithoutRef<"button"> {
	variant?: Variant
	size?: Size
}

export function Button({
	variant = "secondary",
	size = "md",
	className,
	type = "button",
	...rest
}: Props) {
	const classes = [
		styles.button,
		styles[`variant_${variant}`],
		styles[`size_${size}`],
		className,
	]
		.filter(Boolean)
		.join(" ")
	return <button type={type} className={classes} {...rest} />
}
