import { useToday } from "./useToday"

interface Props {
	locale: "en" | "sv"
}

export function TodayNames({ locale }: Props) {
	const { today } = useToday()
	if (!today || today.length === 0) return null
	const formatter = new Intl.ListFormat(locale, {
		style: "long",
		type: "conjunction",
	})
	return <>{formatter.format(today.map((nameday) => nameday.name))}</>
}
