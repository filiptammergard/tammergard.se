import { useEffect } from "react"

export const useInterval = (fn: () => void, interval: number | null) => {
	useEffect(() => {
		if (interval == null) return
		const id = setInterval(fn, interval)
		return () => clearInterval(id)
	}, [fn, interval])
}
