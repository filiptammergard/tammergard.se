import Translate from "@docusaurus/Translate"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useState } from "react"
import styles from "./styles.module.css"

function randomColor() {
	const red = Math.floor(Math.random() * 256)
	const green = Math.floor(Math.random() * 256)
	const blue = Math.floor(Math.random() * 256)
	return `rgb(${red}, ${green}, ${blue})`
}

function buildInitialColors(count: number) {
	return Array.from({ length: count }, randomColor)
}

export function DiscoGenerator() {
	const [columns, setColumns] = useState(3)
	const [rows, setRows] = useState(3)
	const [height, setHeight] = useState(100)
	const [frequency, setFrequency] = useState(1)
	const [colors, setColors] = useState<string[]>(
		buildInitialColors(rows * columns),
	)

	const isRunning = frequency >= 1
	const transitionDuration = isRunning ? 1 / frequency / 2 : 0

	useInterval(
		() => setColors(buildInitialColors(rows * columns)),
		isRunning ? 1000 / frequency : null,
	)

	function handleRowsChange(e: ChangeEvent<HTMLInputElement>) {
		const newRows = Math.min(Number(e.target.value), 20)
		setRows(newRows)
		setColors(buildInitialColors(newRows * columns))
	}

	function handleColumnsChange(e: ChangeEvent<HTMLInputElement>) {
		const newColumns = Math.min(Number(e.target.value), 20)
		setColumns(newColumns)
		setColors(buildInitialColors(rows * newColumns))
	}

	function handleFrequencyChange(e: ChangeEvent<HTMLInputElement>) {
		setFrequency(Math.min(Number(e.target.value), 100))
	}

	return (
		<>
			<div className={styles.controls}>
				<div className={styles.inputWrapper}>
					<label>
						<Translate id="disco.rows">Rows</Translate>
						<input
							type="number"
							min="1"
							max="20"
							step="1"
							value={rows}
							onChange={handleRowsChange}
						/>
					</label>
				</div>
				<div className={styles.inputWrapper}>
					<label>
						<Translate id="disco.columns">Columns</Translate>
						<input
							type="number"
							min="1"
							max="20"
							step="1"
							value={columns}
							onChange={handleColumnsChange}
						/>
					</label>
				</div>
				<div className={styles.inputWrapper}>
					<label>
						<Translate id="disco.frequency">Frequency</Translate>
						<input
							type="number"
							min="1"
							max="100"
							step="1"
							value={frequency}
							onChange={handleFrequencyChange}
						/>
					</label>
				</div>
				<div className={styles.inputWrapper}>
					<label>
						<Translate id="disco.height">Row height</Translate>
						<input
							type="number"
							min="1"
							max="1000"
							step="1"
							value={height}
							onChange={(e) => setHeight(Number(e.target.value))}
						/>
					</label>
				</div>
			</div>
			<section
				className={styles.grid}
				style={{
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gridTemplateRows: `repeat(${rows}, ${height}px)`,
				}}
			>
				{Array.from({ length: rows * columns }).map((_, index) => (
					<div
						key={index}
						style={{
							backgroundColor: colors[index],
							transition: `background-color ${transitionDuration}s linear`,
						}}
					/>
				))}
			</section>
		</>
	)
}
