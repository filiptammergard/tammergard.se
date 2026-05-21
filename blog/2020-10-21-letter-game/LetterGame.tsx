import Translate from "@docusaurus/Translate"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useEffect, useState } from "react"
import styles from "./styles.module.css"

const TIMER_FREQUENCY = 50
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ"
const STORAGE_KEY = "letter_game_highscore"

function getRandomLetter() {
	return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]!
}

export function LetterGame() {
	const [isRunning, setIsRunning] = useState(false)
	const [time, setTime] = useState(0)
	const [letter, setLetter] = useState("")
	const [correct, setCorrect] = useState(0)
	const [score, setScore] = useState(0)
	const [highscore, setHighscore] = useState(0)

	useInterval(
		() => setTime((prev) => prev + TIMER_FREQUENCY),
		isRunning ? TIMER_FREQUENCY : null,
	)

	useEffect(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY)
		if (saved != null) {
			setHighscore(Number(saved))
		}
	}, [])

	function reset() {
		setIsRunning(true)
		setLetter(getRandomLetter())
		setTime(0)
		setCorrect(0)
		setScore(0)
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value.toUpperCase()

		if (!isRunning && input !== " ") return

		if (!isRunning) {
			reset()
			return
		}

		if (input === letter) {
			setLetter(getRandomLetter())
			setCorrect((prev) => prev + 1)
			return
		}

		setIsRunning(false)
		const seconds = time / 1000
		const calculatedScore = correct ** 1.2 / seconds
		setScore(calculatedScore)
		if (calculatedScore > highscore) {
			window.localStorage.setItem(STORAGE_KEY, calculatedScore.toString())
			setHighscore(calculatedScore)
		}
	}

	return (
		<div className={styles.container}>
			{isRunning ? (
				<div className={styles.letter}>{letter}</div>
			) : (
				<p>
					<Translate id="letterGame.pressSpaceToStart">
						Press space to start
					</Translate>
				</p>
			)}
			<input
				className={styles.input}
				type="text"
				onChange={handleInputChange}
				value=""
			/>
			<p className={styles.time}>{(time / 1000).toFixed(2)} s</p>
			{correct ? (
				<p>
					<Translate id="letterGame.lettersCount" values={{ count: correct }}>
						{"Letters: {count}"}
					</Translate>
				</p>
			) : null}
			{score ? (
				<p>
					<Translate id="letterGame.score" values={{ score: score.toFixed(2) }}>
						{"Your score: {score}"}
					</Translate>
				</p>
			) : null}
			{highscore ? (
				<p>
					<Translate
						id="letterGame.highscore"
						values={{ score: highscore.toFixed(2) }}
					>
						{"Your record: {score}"}
					</Translate>
				</p>
			) : null}
		</div>
	)
}
