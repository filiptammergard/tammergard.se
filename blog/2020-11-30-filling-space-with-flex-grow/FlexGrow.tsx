import Translate from "@docusaurus/Translate"
import { useState } from "react"
import styles from "./styles.module.css"

export function FlexGrow() {
	const [amount, setAmount] = useState(5)

	return (
		<>
			<label>
				<Translate id="flexGrow.amount">
					Amount of row items in left column:
				</Translate>
				<input
					className={styles.input}
					type="number"
					min="0"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
			</label>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					{Array.from({ length: amount }).map((_, i) => (
						<div key={i} className={styles.item}>
							<Translate id="flexGrow.inputRow">Input row</Translate>
						</div>
					))}
				</div>
				<div className={styles.right}>
					<div className={`${styles.item} ${styles.fill}`}>
						<Translate id="flexGrow.textarea">Textarea</Translate>
					</div>
					<div className={styles.item}>
						<Translate id="flexGrow.submit">Submit button</Translate>
					</div>
				</div>
			</div>
		</>
	)
}
