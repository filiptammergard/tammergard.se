import { useEffect, useState } from "react"

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

export const useWeeksAgo = (date: Date) => {
	const [now, setNow] = useState(new Date())

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	const weeks = (now.getTime() - date.getTime()) / MS_PER_WEEK
	return weeks.toFixed(9)
}
