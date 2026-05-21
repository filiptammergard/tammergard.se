import Translate, { translate } from "@docusaurus/Translate"
import { type ChangeEvent, useState } from "react"

function countWords(text: string) {
	return text.split(/ |\t|\n|\r/).filter((word) => word !== "").length
}

function countOccurrences(text: string, sequence: string) {
	if (!sequence) return 0
	return text.toLowerCase().split(sequence.toLowerCase()).length - 1
}

export function TextCounter() {
	const [text, setText] = useState("")
	const [sequence, setSequence] = useState("")

	return (
		<>
			<label>
				<Translate id="textCounter.textLabel">Text to analyse</Translate>
				<textarea
					style={{ display: "block", width: "100%" }}
					rows={4}
					value={text}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
						setText(e.target.value)
					}
				/>
			</label>
			<p>
				<Translate
					id="textCounter.wordCount"
					values={{ count: countWords(text) }}
				>
					{"Number of words: {count}"}
				</Translate>
			</p>
			<p>
				<Translate id="textCounter.charCount" values={{ count: text.length }}>
					{"Number of characters: {count}"}
				</Translate>
			</p>
			<label>
				<Translate id="textCounter.sequenceLabel">
					Enter a character or sequence to count
				</Translate>
				<input
					style={{ display: "block", width: "100%" }}
					type="text"
					value={sequence}
					onChange={(e) => setSequence(e.target.value)}
					aria-label={translate({
						id: "textCounter.sequenceAriaLabel",
						message: "Sequence to count",
					})}
				/>
			</label>
			{sequence && (
				<p>
					<Translate
						id="textCounter.occurrences"
						values={{
							sequence,
							count: countOccurrences(text, sequence),
						}}
					>
						{'Occurrences of "{sequence}": {count}'}
					</Translate>
				</p>
			)}
		</>
	)
}
