import Translate, { translate } from "@docusaurus/Translate"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useEffect, useState } from "react"

export function Counter() {
	const [isRunning, setIsRunning] = useState(false)
	const [delay, setDelay] = useState(500)
	const [count, setCount] = useState(0)

	useInterval(() => setCount((prev) => prev + 1), isRunning ? delay : null)

	useEffect(() => {
		setIsRunning(delay >= 50)
	}, [delay])

	function handleDelayChange(e: ChangeEvent<HTMLInputElement>) {
		setDelay(parseInt(e.target.value, 10))
	}

	return (
		<div>
			<label>
				<Translate id="useInterval.chooseDelay">Choose delay [ms]</Translate>
				<br />
				<input
					type="number"
					onChange={handleDelayChange}
					value={delay}
					aria-label={translate({
						id: "useInterval.delayAriaLabel",
						message: "Delay in milliseconds",
					})}
				/>
			</label>
			<p>{count}</p>
		</div>
	)
}
