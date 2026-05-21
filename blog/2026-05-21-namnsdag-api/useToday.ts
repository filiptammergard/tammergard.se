import { useEffect, useState } from "react"

export interface Nameday {
	id: string
	countryCode: string
	name: string
	month: number
	day: number
}

export function useToday() {
	const [today, setToday] = useState<Nameday[] | null>(null)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		fetch("https://namnsdag.tammergard.se/api/v1/today?countryCode=SE")
			.then((res) => res.json())
			.then((data) => setToday(data))
			.catch((err) => setError(err))
	}, [])

	return { today, error }
}
