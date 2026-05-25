import Translate, { translate } from "@docusaurus/Translate"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useDecimalFormat } from "@site/src/hooks/useDecimalFormat"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useReducer, useRef } from "react"
import styles from "./styles.module.css"

type GameState = "idle" | "running"

const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SWEDISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ"
const INTERVAL_MS = 100

interface State {
	index: number
	state: GameState
	incorrectLetter: string
	expectedLetter: string
	isWon: boolean
	time: number
}

type Action =
	| { type: "correct letter" }
	| {
			type: "incorrect letter"
			incorrectLetter: string
			expectedLetter: string
	  }
	| { type: "finished" }
	| { type: "tick" }

const initialState: State = {
	index: 0,
	state: "idle",
	incorrectLetter: "",
	expectedLetter: "",
	isWon: false,
	time: 0,
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "correct letter":
			if (state.state === "idle") {
				return {
					...state,
					state: "running",
					index: 1,
					incorrectLetter: "",
					expectedLetter: "",
					isWon: false,
					time: 0,
				}
			}
			return { ...state, index: state.index + 1 }
		case "incorrect letter":
			return {
				...state,
				state: "idle",
				index: 0,
				incorrectLetter: action.incorrectLetter,
				expectedLetter: action.expectedLetter,
			}
		case "finished":
			return {
				...state,
				state: "idle",
				index: 0,
				isWon: true,
			}
		case "tick":
			return { ...state, time: state.time + INTERVAL_MS }
	}
}

export function AlphabetGame() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const formatDecimal = useDecimalFormat()
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		i18n: { currentLocale },
	} = useDocusaurusContext()
	const alphabet = currentLocale === "sv" ? SWEDISH_ALPHABET : ENGLISH_ALPHABET

	useInterval(
		() => dispatch({ type: "tick" }),
		state.state === "running" ? INTERVAL_MS : null,
	)

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const letter = e.target.value.toUpperCase()
		const expected = alphabet[state.index]

		if (letter !== expected) {
			if (state.state === "idle") return
			dispatch({
				type: "incorrect letter",
				incorrectLetter: letter,
				expectedLetter: expected ?? "",
			})
			return
		}

		if (state.index === alphabet.length - 1) {
			dispatch({ type: "finished" })
		} else {
			dispatch({ type: "correct letter" })
		}
	}

	return (
		<div className={styles.container} onClick={() => inputRef.current?.focus()}>
			<div className={styles.display}>
				<span className={styles.letter}>{alphabet[state.index]}</span>
			</div>
			<input
				ref={inputRef}
				className={styles.input}
				type="text"
				onChange={handleInputChange}
				value=""
				aria-label={translate({
					id: "alphabetGame.inputLabel",
					message: "Alphabet game input",
				})}
			/>
			<p className={styles.time}>{formatDecimal(state.time / 1000, 2)} s</p>
			{state.isWon ? (
				<p>
					<Translate id="alphabetGame.success">Success!</Translate>
				</p>
			) : null}
			{state.incorrectLetter ? (
				<p>
					<Translate
						id="alphabetGame.tooBad"
						values={{
							incorrect: state.incorrectLetter,
							correct: state.expectedLetter,
						}}
					>
						{
							"Too bad! You wrote {incorrect} when it should have been {correct}."
						}
					</Translate>
				</p>
			) : null}
		</div>
	)
}
