import React, { useEffect, useRef, useState } from "react"
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
		const handleMouseDown = (e: MouseEvent) => {
			if (preventMouseDown) e.preventDefault()
			setMouseDownCount((count) => count + 1)
		}
		buttonRef?.current?.addEventListener("mousedown", handleMouseDown)
		return () => {
			buttonRef?.current?.removeEventListener("mousedown", handleMouseDown)
		}
	}, [buttonRef.current, preventMouseDown])

	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			if (preventTouchStart) e.preventDefault()
			setTouchStartCount((count) => count + 1)
		}
		buttonRef?.current?.addEventListener("touchstart", handleTouchStart)
		return () => {
			buttonRef?.current?.removeEventListener("touchstart", handleTouchStart)
		}
	}, [buttonRef.current, preventTouchStart])

	useEffect(() => {
		const handlePointerDown = (e: PointerEvent) => {
			if (preventPointerDown) e.preventDefault()
			setPointerDownCount((count) => count + 1)
		}
		buttonRef?.current?.addEventListener("pointerdown", handlePointerDown)
		return () => {
			buttonRef?.current?.removeEventListener("pointerdown", handlePointerDown)
		}
	}, [buttonRef.current, preventPointerDown])

	return (
		<>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventMouseDown}
					onChange={(e) => setPreventMouseDown(e.target.checked)}
				/>{" "}
				Prevent default on <code>mousedown</code> event
			</label>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventTouchStart}
					onChange={(e) => setPreventTouchStart(e.target.checked)}
				/>{" "}
				Prevent default on <code>touchstart</code> event
			</label>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={preventPointerDown}
					onChange={(e) => setPreventPointerDown(e.target.checked)}
				/>{" "}
				Prevent default on <code>pointerdown</code> event
			</label>
			<button ref={buttonRef} className={styles.button}>
				Click me and see what's happening to the event counts!
			</button>
			<p>
				<code>mousedown</code> event count: {mouseDownCount}
			</p>
			<p>
				<code>touchstart</code> event count: {touchStartCount}
			</p>
			<p>
				<code>pointerdown</code> event count: {pointerDownCount}
			</p>
		</>
	)
}
