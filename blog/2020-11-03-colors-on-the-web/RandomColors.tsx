import Translate from "@docusaurus/Translate"
import { useState } from "react"
import styles from "./styles.module.css"

function ColorDisplay({
	color,
	onClick,
	buttonLabel,
}: {
	color: string
	onClick: () => void
	buttonLabel: React.ReactNode
}) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.center}>
				<button type="button" onClick={onClick}>
					{buttonLabel}
				</button>
			</div>
			<div className={styles.grid}>
				<div className={styles.value}>{color}</div>
				<div className={styles.swatch} style={{ backgroundColor: color }} />
			</div>
		</div>
	)
}

function getRandomHexadecimal() {
	const hexadecimalSymbols = "0123456789ABCDEF"
	const randomIndex = Math.floor(Math.random() * hexadecimalSymbols.length)
	return hexadecimalSymbols[randomIndex]!
}

function getRandomHexadecimalPair() {
	return getRandomHexadecimal() + getRandomHexadecimal()
}

export function Hex() {
	const [color, setColor] = useState("")
	return (
		<ColorDisplay
			color={color}
			onClick={() =>
				setColor(
					`#${getRandomHexadecimalPair()}${getRandomHexadecimalPair()}${getRandomHexadecimalPair()}`,
				)
			}
			buttonLabel={
				<Translate id="colorsOnTheWeb.generateHex">
					Generate HEX value
				</Translate>
			}
		/>
	)
}

export function Rgb() {
	const [color, setColor] = useState("")
	return (
		<ColorDisplay
			color={color}
			onClick={() => {
				const r = Math.floor(Math.random() * 256)
				const g = Math.floor(Math.random() * 256)
				const b = Math.floor(Math.random() * 256)
				setColor(`rgb(${r}, ${g}, ${b})`)
			}}
			buttonLabel={
				<Translate id="colorsOnTheWeb.generateRgb">
					Generate RGB value
				</Translate>
			}
		/>
	)
}

export function Rgba() {
	const [color, setColor] = useState("")
	return (
		<ColorDisplay
			color={color}
			onClick={() => {
				const r = Math.floor(Math.random() * 256)
				const g = Math.floor(Math.random() * 256)
				const b = Math.floor(Math.random() * 256)
				const a = Math.random().toFixed(2)
				setColor(`rgba(${r}, ${g}, ${b}, ${a})`)
			}}
			buttonLabel={
				<Translate id="colorsOnTheWeb.generateRgba">
					Generate RGBA value
				</Translate>
			}
		/>
	)
}

export function Hsl() {
	const [color, setColor] = useState("")
	return (
		<ColorDisplay
			color={color}
			onClick={() => {
				const h = Math.floor(Math.random() * 361)
				const s = Math.floor(Math.random() * 101)
				const l = Math.floor(Math.random() * 101)
				setColor(`hsl(${h}, ${s}%, ${l}%)`)
			}}
			buttonLabel={
				<Translate id="colorsOnTheWeb.generateHsl">
					Generate HSL value
				</Translate>
			}
		/>
	)
}
