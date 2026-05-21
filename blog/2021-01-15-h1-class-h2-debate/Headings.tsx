import Translate from "@docusaurus/Translate"
import styles from "./styles.module.css"

export function Headings() {
	return (
		<>
			<h1 className={styles.h1}>
				<Translate id="h1h2.h1Sample">I'm an h1 heading</Translate>
			</h1>
			<h2 className={styles.h2}>
				<Translate id="h1h2.h2Sample">I'm an h2 heading</Translate>
			</h2>
			<h3 className={styles.h3}>
				<Translate id="h1h2.h3Sample">I'm an h3 heading</Translate>
			</h3>
		</>
	)
}

export function H1AsH2() {
	return (
		<h1 className={styles.h2}>
			<Translate id="h1h2.h1AsH2">
				I'm an h1 heading, but I look like an h2
			</Translate>
		</h1>
	)
}
