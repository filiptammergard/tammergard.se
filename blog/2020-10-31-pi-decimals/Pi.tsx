import Translate from "@docusaurus/Translate"
import { type ChangeEvent, useState } from "react"
import { PI_DECIMALS } from "./decimals"
import styles from "./styles.module.css"

export function Pi() {
	const [correct, setCorrect] = useState("")
	const [incorrect, setIncorrect] = useState("")
	const [nextIndex, setNextIndex] = useState(0)
	const [show, setShow] = useState(false)

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value
		if (!input) return
		if (input === PI_DECIMALS[nextIndex]) {
			setCorrect((prev) => prev + input)
			setNextIndex((prev) => prev + 1)
		} else {
			setIncorrect(input)
		}
	}

	function handleRestart() {
		setCorrect("")
		setNextIndex(0)
		setIncorrect("")
	}

	return (
		<div className={styles.container}>
			<p>3,</p>
			{correct && (
				<p className={styles.decimals}>
					{correct}
					{incorrect && <span className={styles.incorrect}>{incorrect}</span>}
				</p>
			)}
			{incorrect && (
				<p>
					<Translate
						id="piDecimals.wrong"
						values={{
							typed: incorrect,
							expected: PI_DECIMALS[nextIndex] ?? "",
							count: nextIndex,
						}}
					>
						{"{typed} should have been {expected}. You got {count} decimals."}
					</Translate>
				</p>
			)}
			{!incorrect && (
				<input
					className={styles.input}
					type="number"
					value=""
					onChange={handleInput}
				/>
			)}
			{incorrect && (
				<button type="button" className={styles.button} onClick={handleRestart}>
					<Translate id="piDecimals.restart">Restart</Translate>
				</button>
			)}
			<button
				type="button"
				className={styles.button}
				onClick={() => setShow((prev) => !prev)}
			>
				{show ? (
					<Translate id="piDecimals.hide">Hide answer</Translate>
				) : (
					<Translate id="piDecimals.show">Show answer</Translate>
				)}
			</button>
			{show && (
				<p className={styles.decimals}>
					<span className={styles.correct}>
						{PI_DECIMALS.slice(0, nextIndex)}
					</span>
					{PI_DECIMALS.slice(nextIndex)}
				</p>
			)}
		</div>
	)
}
