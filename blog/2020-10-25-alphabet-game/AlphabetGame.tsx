import { Input } from "@site/src/components/TextInput/TextInput"
import { useInterval } from "@site/src/hooks/useInterval"
import React, { KeyboardEvent, useState } from "react"
import styles from "./styles.module.css"

type GameState = "idle" | "running" | "lost" | "won"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const INTERVAL_MS = 100

export function AlphabetGame() {
	const [input, setInput] = useState("")
	const [gameState, setGameState] = useState<GameState>("idle")
	const [time, setTime] = useState(0)
	const [invalidLetter, setInvalidLetter] = useState("")

	useInterval(
		() => setTime(time + INTERVAL_MS),
		gameState === "running" ? INTERVAL_MS : null,
	)

	const nextLetter = input === "" ? ALPHABET[0] : getNextLetter(input.slice(-1))

	function handleInputChange(letterInput: string) {
		const inputLength = letterInput.length
		if (gameState === "won") {
			return
		} else if (gameState === "lost") {
			return
		} else if (letterInput === ALPHABET) {
			setGameState("won")
		} else if (letterInput === ALPHABET.slice(0, inputLength)) {
			setGameState("running")
			setInput(letterInput)
		} else {
			setGameState("lost")
			console.log(letterInput)
			setInvalidLetter(letterInput.slice(-1))
		}
	}

	function handleEnterClick(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			reset()
		}
	}

	function reset() {
		setGameState("idle")
		setInput("")
		setInvalidLetter("")
		setTime(0)
	}

	function getInstruction() {
		if (gameState === "won") {
			return "Success!"
		}
		if (gameState === "lost") {
			return `Too bad! You wrote ${invalidLetter} when it should have been ${nextLetter}.`
		}
		return nextLetter
	}

	return (
		<>
			<p className={styles.instructions}>{getInstruction()}</p>
			<div className={styles.innerWrapper}>
				<Input
					type="text"
					onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
					onKeyDown={handleEnterClick}
					value={input}
					placeholder="Type alphabet (click enter to restart)"
				/>
				<button onClick={reset}>Reset</button>
			</div>
			<p className={styles.time}>{formatTime(time)} s</p>
		</>
	)
}

function getNextLetter(letter: string) {
	const letterIndex = ALPHABET.indexOf(letter.toUpperCase())
	return ALPHABET[letterIndex + 1]
}

function formatTime(milliseconds: number) {
	return (milliseconds / 1000).toFixed(2)
}
