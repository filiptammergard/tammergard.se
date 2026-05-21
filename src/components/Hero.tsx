import type { ReactNode } from "react"
import styles from "./Hero.module.css"

interface HeroProps {
	title: ReactNode
	subtitle?: ReactNode
	children?: ReactNode
}

export function Hero({ title, subtitle, children }: HeroProps) {
	return (
		<section className={styles.hero}>
			<h1 className={styles.title}>{title}</h1>
			{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			{children && <div className={styles.body}>{children}</div>}
		</section>
	)
}
