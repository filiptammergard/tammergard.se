import { translate } from "@docusaurus/Translate"
import { useState } from "react"

const CONSONANTS = "bcdfghjklmnpqrstvwxz"

function Demo({ transform }: { transform: (sentence: string) => string }) {
	const [translation, setTranslation] = useState("")
	return (
		<div>
			<input
				style={{ width: "100%" }}
				placeholder={translate({
					id: "robberLang.placeholder",
					message: "Type text to translate…",
				})}
				onChange={(e) => setTranslation(transform(e.target.value))}
			/>
			<p>{translation}</p>
		</div>
	)
}

function v1Transform(sentence: string) {
	CONSONANTS.split("").forEach((c) => {
		sentence = sentence.replaceAll(c, `${c}o${c}`)
	})
	return sentence
}

function v2Transform(sentence: string) {
	const all = CONSONANTS + CONSONANTS.toUpperCase()
	all.split("").forEach((c) => {
		sentence = sentence.replaceAll(c, `${c}o${c}`)
	})
	return sentence
}

function v3Transform(sentence: string) {
	CONSONANTS.split("").forEach((c) => {
		sentence = sentence.replaceAll(c, `${c}o${c}`)
		sentence = sentence.replaceAll(c.toUpperCase(), `${c.toUpperCase()}o${c}`)
	})
	return sentence
}

function v4Transform(sentence: string) {
	const all = CONSONANTS + CONSONANTS.toUpperCase()
	all.split("").forEach((c) => {
		sentence = sentence.replaceAll(c, `${c}o${c.toLowerCase()}`)
	})
	return sentence
}

function v5Transform(sentence: string) {
	sentence = sentence.replaceAll("x", "ks").replaceAll("X", "Ks")
	CONSONANTS.split("").forEach((c) => {
		sentence = sentence.replaceAll(c, `${c}o${c}`)
		sentence = sentence.replaceAll(c.toUpperCase(), `${c.toUpperCase()}o${c}`)
	})
	return sentence
}

function v6Transform(sentence: string) {
	const withoutX = sentence.replaceAll("x", "ks").replaceAll("X", "Ks")
	let translated = withoutX
	CONSONANTS.split("").forEach((c) => {
		translated = translated.replaceAll(c, `${c}o${c}`)
		translated = translated.replaceAll(
			c.toUpperCase(),
			`${c.toUpperCase()}o${c}`,
		)
	})
	return translated
}

function finishedTransform(sentence: string) {
	let result = sentence.replaceAll("x", "ks").replaceAll("X", "Ks")
	CONSONANTS.split("").forEach((c) => {
		result = result.replaceAll(c, `${c}o${c}`)
	})
	CONSONANTS.toUpperCase()
		.split("")
		.forEach((c) => {
			result = result.replaceAll(c, `${c}o${c.toLowerCase()}`)
		})
	return result
}

function a2v1Transform(sentence: string) {
	const withoutX = sentence.replaceAll("x", "ks").replaceAll("X", "Ks")
	let result = ""
	withoutX.split("").forEach((letter) => {
		if (CONSONANTS.split("").includes(letter)) {
			result += `${letter}o${letter}`
		} else if (CONSONANTS.toUpperCase().split("").includes(letter)) {
			result += `${letter}o${letter.toLowerCase()}`
		} else {
			result += letter
		}
	})
	return result
}

function a2v2Transform(sentence: string) {
	const withoutX = sentence.replaceAll("x", "ks").replaceAll("X", "Ks")
	return withoutX
		.split("")
		.map((letter) =>
			CONSONANTS.split("").includes(letter.toLowerCase())
				? `${letter}o${letter.toLowerCase()}`
				: letter,
		)
		.join("")
}

function a2v3Transform(sentence: string) {
	const replaceX = (s: string) => s.replaceAll("x", "ks").replaceAll("X", "Ks")
	const isConsonant = (letter: string) =>
		CONSONANTS.split("").includes(letter.toLowerCase())
	const handleConsonant = (letter: string) =>
		`${letter}o${letter.toLowerCase()}`
	const handleLetter = (letter: string) =>
		isConsonant(letter) ? handleConsonant(letter) : letter
	return replaceX(sentence).split("").map(handleLetter).join("")
}

function a2v4Transform(sentence: string) {
	const isConsonant = (letter: string) =>
		CONSONANTS.split("").includes(letter.toLowerCase())
	const translateConsonant = (letter: string) =>
		`${letter}o${letter.toLowerCase()}`
	const isX = (letter: string) => letter.toLowerCase() === "x"
	const isUpperCase = (letter: string) => letter === letter.toUpperCase()
	const translateUpperCaseX = () =>
		translateConsonant("K") + translateConsonant("s")
	const translateLowerCaseX = () =>
		translateConsonant("k") + translateConsonant("s")
	const handleX = (letter: string) =>
		isUpperCase(letter) ? translateUpperCaseX() : translateLowerCaseX()
	const handleConsonant = (letter: string) =>
		isX(letter) ? handleX(letter) : translateConsonant(letter)
	const handleLetter = (letter: string) =>
		isConsonant(letter) ? handleConsonant(letter) : letter
	return sentence.split("").map(handleLetter).join("")
}

export function RobberLanguageGeneratorFinished() {
	return <Demo transform={finishedTransform} />
}

export function RobberLanguageGeneratorA1V1() {
	return <Demo transform={v1Transform} />
}

export function RobberLanguageGeneratorA1V2() {
	return <Demo transform={v2Transform} />
}

export function RobberLanguageGeneratorA1V3() {
	return <Demo transform={v3Transform} />
}

export function RobberLanguageGeneratorA1V4() {
	return <Demo transform={v4Transform} />
}

export function RobberLanguageGeneratorA1V5() {
	return <Demo transform={v5Transform} />
}

export function RobberLanguageGeneratorA1V6() {
	return <Demo transform={v6Transform} />
}

export function RobberLanguageGeneratorA2V1() {
	return <Demo transform={a2v1Transform} />
}

export function RobberLanguageGeneratorA2V2() {
	return <Demo transform={a2v2Transform} />
}

export function RobberLanguageGeneratorA2V3() {
	return <Demo transform={a2v3Transform} />
}

export function RobberLanguageGeneratorA2V4() {
	return <Demo transform={a2v4Transform} />
}
