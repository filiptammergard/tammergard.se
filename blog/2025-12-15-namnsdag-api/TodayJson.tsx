import CodeBlock from "@theme/CodeBlock"
import { useToday } from "./useToday"

export function TodayJson() {
	const { today, error } = useToday()

	if (error) {
		return <p>{error.message}</p>
	}

	if (!today) {
		return null
	}

	return (
		<CodeBlock className="language-json">
			{JSON.stringify(today, null, 2)}
		</CodeBlock>
	)
}
