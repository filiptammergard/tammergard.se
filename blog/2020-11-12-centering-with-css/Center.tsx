import Translate from "@docusaurus/Translate"
import styles from "./styles.module.css"

function CenterMe() {
	return (
		<span>
			<Translate id="centeringCss.centerMe">I want to be centered!</Translate>
		</span>
	)
}

export function Start() {
	return (
		<div className={styles.wrapper}>
			<CenterMe />
		</div>
	)
}

export function Grid() {
	return (
		<div className={`${styles.wrapper} ${styles.grid}`}>
			<CenterMe />
		</div>
	)
}

export function Flex() {
	return (
		<div className={`${styles.wrapper} ${styles.flex}`}>
			<CenterMe />
		</div>
	)
}

export function GridMargin() {
	return (
		<div className={`${styles.wrapper} ${styles.gridMargin}`}>
			<CenterMe />
		</div>
	)
}

export function GridEnd() {
	return (
		<div className={`${styles.wrapper} ${styles.gridEnd}`}>
			<CenterMe />
		</div>
	)
}

export function GridMargin2() {
	return (
		<div className={`${styles.wrapper} ${styles.gridMargin2}`}>
			<span className={styles.center}>
				<Translate id="centeringCss.centerMe">I want to be centered!</Translate>
			</span>
			<span>
				<Translate id="centeringCss.dontCenterMe">
					I don't want to be centered.
				</Translate>
			</span>
		</div>
	)
}
