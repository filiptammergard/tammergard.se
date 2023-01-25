import React, { ComponentPropsWithoutRef } from "react"
import styles from "./styles.module.css"

type Props = ComponentPropsWithoutRef<"input">

export function Input(props: Props) {
	return <input className={styles.input} type="text" {...props} />
}
