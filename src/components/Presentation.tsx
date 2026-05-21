import CodeBlock from "@theme/CodeBlock"
import { useWeeksAgo } from "../hooks/useWeeksAgo"

export function Presentation() {
	const weeks = useWeeksAgo(new Date("1994-08-06T10:00"))
	return (
		<CodeBlock language="ts" title="Presentation">
			{`const name = "Filip Tammergård"
const location = "Uppsala, Sweden 🇸🇪"
let ageInWeeks = ${weeks}

makePresentation({ name, location, age: weeksToYears(ageInWeeks) })`}
		</CodeBlock>
	)
}
