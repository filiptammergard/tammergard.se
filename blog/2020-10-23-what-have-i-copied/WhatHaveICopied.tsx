import Translate, { translate } from "@docusaurus/Translate"
import { useState } from "react"

export function WhatHaveICopied() {
	const [clipboard, setClipboard] = useState<string>()

	async function read() {
		try {
			const value = await navigator.clipboard.readText()
			setClipboard(value.trim())
		} catch {
			setClipboard(
				translate({
					id: "whatCopied.error",
					message: "Couldn't show what you copied...",
				}),
			)
		}
	}

	return (
		<div>
			<button type="button" onClick={read}>
				<Translate id="whatCopied.button">Show what I copied</Translate>
			</button>
			<p>
				<Translate id="whatCopied.label">You have copied:</Translate>
			</p>
			<p>
				{clipboard || (
					<Translate id="whatCopied.empty">
						You haven't copied anything…
					</Translate>
				)}
			</p>
		</div>
	)
}
