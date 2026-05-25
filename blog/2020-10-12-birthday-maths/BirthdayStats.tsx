import Translate from "@docusaurus/Translate"
import { useInterval } from "@site/src/hooks/useInterval"
import { type ChangeEvent, useState } from "react"
import styles from "./styles.module.css"

const MS_PER_SECOND = 1000
const MS_PER_MINUTE = MS_PER_SECOND * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24
const MS_PER_WEEK = MS_PER_DAY * 7

function getMillisecondsDiff(start: Date, end: Date) {
	return end.getTime() - start.getTime()
}

function addMonths(date: Date, n: number) {
	const result = new Date(date)
	result.setDate(1)
	result.setMonth(date.getMonth() + n)
	const daysInResultMonth = new Date(
		result.getFullYear(),
		result.getMonth() + 1,
		0,
	).getDate()
	result.setDate(Math.min(date.getDate(), daysInResultMonth))
	return result
}

function getMonthsDiff(start: Date, end: Date) {
	let months =
		(end.getFullYear() - start.getFullYear()) * 12 +
		(end.getMonth() - start.getMonth())
	if (addMonths(start, months) > end) months -= 1
	const anchor = addMonths(start, months)
	const nextAnchor = addMonths(start, months + 1)
	const fractional =
		(end.getTime() - anchor.getTime()) /
		(nextAnchor.getTime() - anchor.getTime())
	return months + fractional
}

function getYearsDiff(start: Date, end: Date) {
	let years = end.getFullYear() - start.getFullYear()
	if (addMonths(start, years * 12) > end) years -= 1
	const anchor = addMonths(start, years * 12)
	const nextAnchor = addMonths(start, (years + 1) * 12)
	const fractional =
		(end.getTime() - anchor.getTime()) /
		(nextAnchor.getTime() - anchor.getTime())
	return years + fractional
}

function toDateInputValue(date: Date) {
	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const dd = String(date.getDate()).padStart(2, "0")
	return `${yyyy}-${mm}-${dd}`
}

function toDateTimeInputValue(date: Date) {
	const hh = String(date.getHours()).padStart(2, "0")
	const min = String(date.getMinutes()).padStart(2, "0")
	return `${toDateInputValue(date)}T${hh}:${min}`
}

export function BirthdayStats() {
	const [startDate, setStartDate] = useState(new Date("1994-08-06T10:00"))
	const [endDate, setEndDate] = useState(new Date())
	const [isStartDateTime, setIsStartDateTime] = useState(false)
	const [isEndDateTime, setIsEndDateTime] = useState(false)
	const [isCustomEndDate, setIsCustomEndDate] = useState(false)

	useInterval(() => setEndDate(new Date()), isCustomEndDate ? null : 500)

	function handleStartDateChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value
		if (!input) return
		const inputDate = input.includes("T")
			? new Date(input)
			: new Date(`${input}T00:00`)
		setStartDate(inputDate)
	}

	function handleEndDateChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value
		if (!input) return
		const inputDate = input.includes("T")
			? new Date(input)
			: new Date(`${input}T00:00`)
		setEndDate(inputDate)
		setIsCustomEndDate(inputDate.toDateString() !== new Date().toDateString())
	}

	const ms = getMillisecondsDiff(startDate, endDate)

	return (
		<>
			<div className={styles.field}>
				<label>
					<Translate id="birthdayMaths.startDate">Pick a start date</Translate>
					<input
						type={isStartDateTime ? "datetime-local" : "date"}
						onChange={handleStartDateChange}
						value={
							isStartDateTime
								? toDateTimeInputValue(startDate)
								: toDateInputValue(startDate)
						}
					/>
				</label>
			</div>
			<small className={styles.smallBlock}>
				<Translate id="birthdayMaths.startDateHelp">
					For example your birthday
				</Translate>
			</small>
			<label>
				<input
					type="checkbox"
					onChange={() => setIsStartDateTime(!isStartDateTime)}
					checked={isStartDateTime}
				/>{" "}
				<Translate id="birthdayMaths.includeTime">Include time</Translate>
			</label>
			<br />
			<br />
			<div className={styles.field}>
				<label>
					<Translate id="birthdayMaths.endDate">Pick an end date</Translate>
					<input
						type={isEndDateTime ? "datetime-local" : "date"}
						onChange={handleEndDateChange}
						value={
							isEndDateTime
								? toDateTimeInputValue(endDate)
								: toDateInputValue(endDate)
						}
					/>
				</label>
			</div>
			<small className={styles.smallBlock}>
				<Translate id="birthdayMaths.endDateHelp">
					For example today's date
				</Translate>
			</small>
			<label>
				<input
					type="checkbox"
					onChange={() => setIsEndDateTime(!isEndDateTime)}
					checked={isEndDateTime}
				/>{" "}
				<Translate id="birthdayMaths.includeTime">Include time</Translate>
			</label>
			<section className={styles.results}>
				<small>
					<Translate id="birthdayMaths.years">Years</Translate>
				</small>
				<p>{getYearsDiff(startDate, endDate).toFixed(12)}</p>
				<small>
					<Translate id="birthdayMaths.months">Months</Translate>
				</small>
				<p>{getMonthsDiff(startDate, endDate).toFixed(12)}</p>
				<small>
					<Translate id="birthdayMaths.weeks">Weeks</Translate>
				</small>
				<p>{(ms / MS_PER_WEEK).toFixed(9)}</p>
				<small>
					<Translate id="birthdayMaths.days">Days</Translate>
				</small>
				<p>{(ms / MS_PER_DAY).toFixed(9)}</p>
				<small>
					<Translate id="birthdayMaths.hours">Hours</Translate>
				</small>
				<p>{(ms / MS_PER_HOUR).toFixed(6)}</p>
				<small>
					<Translate id="birthdayMaths.minutes">Minutes</Translate>
				</small>
				<p>{(ms / MS_PER_MINUTE).toFixed(6)}</p>
				<small>
					<Translate id="birthdayMaths.seconds">Seconds</Translate>
				</small>
				<p>{(ms / MS_PER_SECOND).toFixed(3)}</p>
				<small>
					<Translate id="birthdayMaths.milliseconds">Milliseconds</Translate>
				</small>
				<p>{ms}</p>
			</section>
		</>
	)
}

export function MyWeeks() {
	const [endDate, setEndDate] = useState(new Date())
	useInterval(() => setEndDate(new Date()), 500)
	const start = new Date("1994-08-06T10:00")
	const weeks = (endDate.getTime() - start.getTime()) / MS_PER_WEEK
	return <span className={styles.monospace}>{weeks.toFixed(9)}</span>
}
