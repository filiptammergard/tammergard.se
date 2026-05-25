import Translate, { translate } from "@docusaurus/Translate"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useDecimalFormat } from "@site/src/hooks/useDecimalFormat"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useEffect, useReducer, useRef } from "react"
import styles from "./styles.module.css"

const TIMER_FREQUENCY = 50
const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SWEDISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ"
const STORAGE_KEY = "letter_game_highscore"
const SECONDS_PER_MINUTE = 60

type GameState = "idle" | "running"

interface State {
	state: GameState
	time: number
	letter: string
	correct: number
	score: number
	highscore: number
}

type Action =
	| { type: "loadLetter"; letter: string }
	| { type: "correct"; letter: string }
	| { type: "wrong"; letter: string; score: number; newHighscore?: number }
	| { type: "tick" }
	| { type: "loadHighscore"; highscore: number }

const initialState: State = {
	state: "idle",
	time: 0,
	letter: "",
	correct: 0,
	score: 0,
	highscore: 0,
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "loadLetter":
			return { ...state, letter: action.letter }
		case "correct":
			if (state.state === "idle") {
				return {
					...state,
					state: "running",
					letter: action.letter,
					time: 0,
					correct: 1,
					score: 0,
				}
			}
			return {
				...state,
				letter: action.letter,
				correct: state.correct + 1,
			}
		case "wrong":
			return {
				...state,
				state: "idle",
				letter: action.letter,
				score: action.score,
				highscore: action.newHighscore ?? state.highscore,
			}
		case "tick":
			return { ...state, time: state.time + TIMER_FREQUENCY }
		case "loadHighscore":
			return { ...state, highscore: action.highscore }
	}
}

function getRandomLetter(alphabet: string, exclude?: string) {
	const available = exclude ? alphabet.replace(exclude, "") : alphabet
	return available[Math.floor(Math.random() * available.length)]!
}

export function LetterGame() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const formatDecimal = useDecimalFormat()
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		i18n: { currentLocale },
	} = useDocusaurusContext()
	const alphabet = currentLocale === "sv" ? SWEDISH_ALPHABET : ENGLISH_ALPHABET

	useInterval(
		() => dispatch({ type: "tick" }),
		state.state === "running" ? TIMER_FREQUENCY : null,
	)

	useEffect(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY)
		const parsed = Number(saved)
		if (Number.isFinite(parsed) && parsed > 0) {
			dispatch({ type: "loadHighscore", highscore: parsed })
		}
		dispatch({ type: "loadLetter", letter: getRandomLetter(alphabet) })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value.toUpperCase()

		if (input === state.letter) {
			dispatch({
				type: "correct",
				letter: getRandomLetter(alphabet, state.letter),
			})
			return
		}

		if (state.state === "idle") return

		const seconds = state.time / 1000
		const newScore =
			seconds > 0 ? (state.correct * SECONDS_PER_MINUTE) / seconds : 0
		const isNewHighscore =
			Number.isFinite(newScore) && newScore > state.highscore

		if (isNewHighscore) {
			window.localStorage.setItem(STORAGE_KEY, String(newScore))
		}

		dispatch({
			type: "wrong",
			letter: getRandomLetter(alphabet, state.letter),
			score: newScore,
			...(isNewHighscore && { newHighscore: newScore }),
		})
	}

	return (
		<div className={styles.container} onClick={() => inputRef.current?.focus()}>
			<div className={styles.display}>
				<span className={styles.letter}>{state.letter}</span>
			</div>
			<input
				ref={inputRef}
				className={styles.input}
				type="text"
				onChange={handleInputChange}
				value=""
				aria-label={translate({
					id: "letterGame.inputLabel",
					message: "Letter game input",
				})}
			/>
			<p className={styles.time}>{formatDecimal(state.time / 1000, 2)} s</p>
			{state.correct ? (
				<p>
					<Translate
						id="letterGame.lettersCount"
						values={{ count: state.correct }}
					>
						{"Letters: {count}"}
					</Translate>
				</p>
			) : null}
			{state.score ? (
				<p>
					<Translate
						id="letterGame.score"
						values={{ score: formatDecimal(state.score, 2) }}
					>
						{"Your score: {score}"}
					</Translate>
				</p>
			) : null}
			{state.highscore ? (
				<p>
					<Translate
						id="letterGame.highscore"
						values={{ score: formatDecimal(state.highscore, 2) }}
					>
						{"Your record: {score}"}
					</Translate>
				</p>
			) : null}
		</div>
	)
}
