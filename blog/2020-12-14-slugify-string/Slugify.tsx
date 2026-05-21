import Translate, { translate } from "@docusaurus/Translate"
import { useState } from "react"

function slugify(str: string) {
	return str
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
}

export function Slugify() {
	const [input, setInput] = useState("")

	return (
		<>
			<label>
				<Translate id="slugify.label">Write something to slugify</Translate>
				<input
					style={{ width: "100%" }}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					aria-label={translate({
						id: "slugify.inputAriaLabel",
						message: "Text to slugify",
					})}
				/>
			</label>
			<p>{slugify(input)}</p>
		</>
	)
}
