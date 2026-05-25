import Translate, { translate } from "@docusaurus/Translate"
import { TextInput } from "@site/src/components/TextInput/TextInput"
import { useDecimalFormat } from "@site/src/hooks/useDecimalFormat"
import { useInterval } from "@site/src/hooks/useInterval"
import { type KeyboardEvent, useReducer } from "react"
import styles from "./styles.module.css"

type GameState = "idle" | "running" | "lost" | "won"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const INTERVAL_MS = 100

interface State {
	correctLetter: string
	incorrectLetter: string
	input: string
	instruction: string
	state: GameState
	time: number
}

type Action =
	| { type: "correct letter"; input: string }
	| { type: "incorrect letter"; correctLetter: string; incorrectLetter: string }
	| { type: "finished" }
	| { type: "reset" }
	| { type: "tick" }

const initialState: State = {
	correctLetter: "",
	incorrectLetter: "",
	input: "",
	instruction: ALPHABET[0]!,
	state: "idle",
	time: 0,
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "correct letter":
			return {
				...state,
				state: "running",
				input: action.input,
				instruction: getNextLetter(action.input)!,
			}
		case "incorrect letter":
			return {
				...state,
				state: "lost",
				correctLetter: action.correctLetter,
				incorrectLetter: action.incorrectLetter,
			}
		case "finished":
			return { ...state, state: "won" }
		case "tick":
			return { ...state, time: state.time + INTERVAL_MS }
		case "reset":
			return initialState
	}
}

export function AlphabetGame() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const formatDecimal = useDecimalFormat()

	useInterval(
		() => dispatch({ type: "tick" }),
		state.state === "running" ? INTERVAL_MS : null,
	)

	function handleInputChange(letterInput: string) {
		const inputLength = letterInput.length
		if (state.state === "idle" && letterInput !== ALPHABET[0]) {
			return
		} else if (state.state === "lost") {
			return
		} else if (state.state === "won") {
			return
		} else if (letterInput === ALPHABET) {
			dispatch({ type: "finished" })
		} else if (letterInput === ALPHABET.slice(0, inputLength)) {
			dispatch({ type: "correct letter", input: letterInput })
		} else {
			dispatch({
				type: "incorrect letter",
				correctLetter: ALPHABET[inputLength - 2]!,
				incorrectLetter: letterInput.slice(-1),
			})
		}
	}

	function handleEnterClick(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			dispatch({ type: "reset" })
		}
	}

	return (
		<>
			<p className={styles.instructions}>
				{state.state === "won" ? (
					<Translate id="alphabetGame.success">Success!</Translate>
				) : state.state === "lost" ? (
					<Translate
						id="alphabetGame.tooBad"
						values={{
							incorrect: state.incorrectLetter,
							correct: getNextLetter(state.correctLetter) ?? "",
						}}
					>
						{
							"Too bad! You wrote {incorrect} when it should have been {correct}."
						}
					</Translate>
				) : (
					state.instruction
				)}
			</p>
			<div className={styles.innerWrapper}>
				<TextInput
					onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
					onKeyDown={handleEnterClick}
					value={state.input}
					placeholder={translate({
						id: "alphabetGame.placeholder",
						message: "Type alphabet (click enter to restart)",
					})}
				/>
				<button onClick={() => dispatch({ type: "reset" })}>
					<Translate id="alphabetGame.reset">Reset</Translate>
				</button>
			</div>
			<p className={styles.time}>{formatDecimal(state.time / 1000, 2)} s</p>
		</>
	)
}

function getNextLetter(letter: string) {
	const letterIndex = ALPHABET.indexOf(letter.toUpperCase())
	return ALPHABET[letterIndex + 1]
}
