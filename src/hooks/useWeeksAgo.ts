import { useEffect, useState } from "react"
import { useDecimalFormat } from "./useDecimalFormat"

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

export const useWeeksAgo = (date: Date) => {
	const [now, setNow] = useState(new Date())
	const formatDecimal = useDecimalFormat()

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	const weeks = (now.getTime() - date.getTime()) / MS_PER_WEEK
	return formatDecimal(weeks, 9)
}
