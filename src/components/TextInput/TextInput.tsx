import type { ComponentPropsWithoutRef } from "react"
import styles from "./styles.module.css"

type Props = ComponentPropsWithoutRef<"input">

export function TextInput(props: Props) {
	return <input className={styles.input} type="text" {...props} />
}
