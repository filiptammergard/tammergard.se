import { useToday } from "./useToday"

export function TodayLatin() {
	const { today } = useToday()
	if (!today) return null
	return <>{today.formatted.latin}</>
}
