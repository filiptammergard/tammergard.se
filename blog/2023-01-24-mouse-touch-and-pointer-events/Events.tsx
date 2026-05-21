import Translate from "@docusaurus/Translate"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"

export function Events() {
	const [mouseDownCount, setMouseDownCount] = useState(0)
	const [touchStartCount, setTouchStartCount] = useState(0)
	const [pointerDownCount, setPointerDownCount] = useState(0)

	const [preventMouseDown, setPreventMouseDown] = useState(false)
	const [preventTouchStart, setPreventTouchStart] = useState(false)
	const [preventPointerDown, setPreventPointerDown] = useState(false)

	const buttonRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		const button = buttonRef.current
		if (!button) return
		const handleMouseDown = (e: MouseEvent) => {
			if (preventMouseDown) e.preventDefault()
			setMouseDownCount((count) => count + 1)
		}
		button.addEventListener("mousedown", handleMouseDown)
		return () => button.removeEventListener("mousedown", handleMouseDown)
	}, [preventMouseDown])

	useEffect(() => {
		const button = buttonRef.current
		if (!button) return
		const handleTouchStart = (e: TouchEvent) => {
			if (preventTouchStart) e.preventDefault()
			setTouchStartCount((count) => count + 1)
		}
		button.addEventListener("touchstart", handleTouchStart)
		return () => button.removeEventListener("touchstart", handleTouchStart)
	}, [preventTouchStart])

	useEffect(() => {
		const button = buttonRef.current
		if (!button) return
		const handlePointerDown = (e: PointerEvent) => {
			if (preventPointerDown) e.preventDefault()
			setPointerDownCount((count) => count + 1)
		}
		button.addEventListener("pointerdown", handlePointerDown)
		return () => button.removeEventListener("pointerdown", handlePointerDown)
	}, [preventPointerDown])

	return (
		<>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventMouseDown}
					onChange={(e) => setPreventMouseDown(e.target.checked)}
				/>{" "}
				<Translate id="events.preventOn">Prevent default on</Translate>{" "}
				<code>mousedown</code> <Translate id="events.event">event</Translate>
			</label>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventTouchStart}
					onChange={(e) => setPreventTouchStart(e.target.checked)}
				/>{" "}
				<Translate id="events.preventOn">Prevent default on</Translate>{" "}
				<code>touchstart</code> <Translate id="events.event">event</Translate>
			</label>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventPointerDown}
					onChange={(e) => setPreventPointerDown(e.target.checked)}
				/>{" "}
				<Translate id="events.preventOn">Prevent default on</Translate>{" "}
				<code>pointerdown</code> <Translate id="events.event">event</Translate>
			</label>
			<button ref={buttonRef} type="button" className={styles.button}>
				<Translate id="events.button">
					Click me and see what's happening to the event counts!
				</Translate>
			</button>
			<p>
				<Translate
					id="events.mouseDownCount"
					values={{ count: mouseDownCount }}
				>
					{"mousedown event count: {count}"}
				</Translate>
			</p>
			<p>
				<Translate
					id="events.touchStartCount"
					values={{ count: touchStartCount }}
				>
					{"touchstart event count: {count}"}
				</Translate>
			</p>
			<p>
				<Translate
					id="events.pointerDownCount"
					values={{ count: pointerDownCount }}
				>
					{"pointerdown event count: {count}"}
				</Translate>
			</p>
		</>
	)
}
