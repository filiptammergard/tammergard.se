import Translate, { translate } from "@docusaurus/Translate"
import { type ChangeEvent, useState } from "react"

function isDivisibleBy(numerator: number, denominator: number) {
	return numerator % denominator === 0
}

function isLeapYear(year: number): boolean {
	if (isDivisibleBy(year, 400)) return true
	if (isDivisibleBy(year, 100)) return false
	if (isDivisibleBy(year, 4)) return true
	return false
}

function getFirstWeekdayInYear(year: number) {
	const date = new Date(year, 0, 1)
	date.setFullYear(year)
	return date.getDay()
}

function getWeeksInYear(year: number) {
	const firstWeekdayNextYear = getFirstWeekdayInYear(year + 1)
	if (firstWeekdayNextYear === 5) return 53
	if (firstWeekdayNextYear === 6 && isLeapYear(year)) return 53
	return 52
}

export function CalendarMaths() {
	const [year, setYear] = useState<number | null>(new Date().getFullYear())

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		if (!value) {
			setYear(null)
			return
		}
		setYear(Number(value))
	}

	return (
		<div style={{ marginBottom: "1rem" }}>
			<label style={{ display: "block", marginBottom: "0.5rem" }}>
				<Translate id="calendarMaths.label">Year</Translate>
				<input
					type="number"
					placeholder={translate({
						id: "calendarMaths.placeholder",
						message: "Enter a year…",
					})}
					value={year ?? ""}
					onChange={handleInputChange}
					style={{ display: "block", marginTop: "0.25rem" }}
				/>
			</label>
			{year !== null && (
				<p style={{ marginTop: "1rem" }}>
					{isLeapYear(year) ? (
						<Translate
							id="calendarMaths.resultLeap"
							values={{ year, weeks: getWeeksInYear(year) }}
						>
							{"Year {year} has {weeks} weeks and is a leap year."}
						</Translate>
					) : (
						<Translate
							id="calendarMaths.resultNonLeap"
							values={{ year, weeks: getWeeksInYear(year) }}
						>
							{"Year {year} has {weeks} weeks and is not a leap year."}
						</Translate>
					)}
				</p>
			)}
		</div>
	)
}
