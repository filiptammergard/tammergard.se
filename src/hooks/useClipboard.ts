import { useState } from "react"

export function useClipboard() {
	const [clipboard, setClipboard] = useState<string>()

	async function read() {
		try {
			const value = await navigator.clipboard.readText()
			setClipboard(value.trim())
		} catch {
			setClipboard("Couldn't access clipboard...")
		}
	}

	return [clipboard, read] as const
}
