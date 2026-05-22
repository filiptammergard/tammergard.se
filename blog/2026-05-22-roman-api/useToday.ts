import { useEffect, useState } from "react"

export interface Today {
	date: {
		year: number
		month: number
		day: number
		latinMonth: string
	}
	arabic: { year: number; month: number; day: number }
	roman: { year: string; month: string; day: string }
	formatted: { latin: string; compact: string }
	timeZone: string
}

export function useToday() {
	const [today, setToday] = useState<Today | null>(null)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		fetch("https://roman.tammergard.se/api/v1/today")
			.then((res) => res.json())
			.then((data) => setToday(data))
			.catch((err) => setError(err))
	}, [])

	return { today, error }
}
