import CodeBlock from "@theme/CodeBlock"
import React from "react"
import { useIpLocation } from "./useIpLocation"

export function Json() {
	const { ipLocation, error } = useIpLocation()

	if (error) {
		return <p>{error.message}</p>
	}

	if (!ipLocation) {
		return null
	}

	return (
		<CodeBlock className="language-json">
			{JSON.stringify(ipLocation, null, 2)}
		</CodeBlock>
	)
}
