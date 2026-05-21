import Translate from "@docusaurus/Translate"
import { useState } from "react"

function getRandomColor() {
	const red = Math.floor(Math.random() * 256)
	const green = Math.floor(Math.random() * 256)
	const blue = Math.floor(Math.random() * 256)
	return `rgb(${red}, ${green}, ${blue})`
}

export function RandomColor() {
	const [background, setBackground] = useState("rgb(91, 197, 231)")

	return (
		<>
			<button type="button" onClick={() => setBackground(getRandomColor())}>
				<Translate id="getRandomColor.button">Generate random color</Translate>
			</button>
			<div
				style={{
					background,
					border: "1px solid black",
					borderRadius: "8px",
					margin: "15px 0",
					padding: "10px",
					textAlign: "center",
				}}
			>
				{background}
			</div>
		</>
	)
}
