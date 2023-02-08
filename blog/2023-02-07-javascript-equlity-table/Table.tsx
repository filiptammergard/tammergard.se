import React, { useState } from "react"
import styles from "./styles.module.css"

export function Table() {
	const [equality, setEquality] = useState<"double" | "triple">("double")

	return (
		<>
			<label>
				<input
					type="radio"
					name="equality"
					checked={equality === "double"}
					onClick={() => setEquality("double")}
				/>
				Double equals (equality operator)
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="equality"
					checked={equality === "triple"}
					onClick={() => setEquality("triple")}
				/>
				Triple equals (strict equality operator)
			</label>
			<br />
			<br />
			<table>
				<thead>
					<tr>
						<th />
						{COLUMNS.map((columnHeader) => (
							<th className={styles.th} scope="row">
								{columnHeader.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{ROWS.map((rowHeader) => (
						<tr>
							<th scope="column">{rowHeader.label}</th>
							{COLUMNS.map((row) => (
								<td
									className={
										compare(equality, row.value, rowHeader.value) && styles.true
									}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

function compare(equality: "double" | "triple", val1: unknown, val2: unknown) {
	if (equality === "triple") {
		return val1 === val2
	}
	return val1 == val2
}

const COLUMNS = [
	{
		label: "true",
		value: true,
	},
	{
		label: "false",
		value: false,
	},
	{
		label: "1",
		value: 1,
	},
	{
		label: "0",
		value: 0,
	},
	{
		label: "-1",
		value: -1,
	},
	{
		label: '"true"',
		value: "true",
	},
	{
		label: '"false"',
		value: "false",
	},
	{
		label: '"1"',
		value: "1",
	},
	{
		label: '"0"',
		value: "0",
	},
	{
		label: '"-1"',
		value: "-1",
	},
	{
		label: '""',
		value: "",
	},
	{
		label: "null",
		value: null,
	},
	{
		label: "undefined",
		value: undefined,
	},
	{
		label: "Infinity",
		value: Infinity,
	},
	{
		label: "-Infinity",
		value: -Infinity,
	},
	{
		label: "[]",
		value: [],
	},
	{
		label: "{}",
		value: {},
	},
	{
		label: "[[]]",
		value: [[]],
	},
	{
		label: "[0]",
		value: [0],
	},
	{
		label: "[1]",
		value: [1],
	},
	{
		label: "NaN",
		value: NaN,
	},
]

const ROWS = [
	{
		label: "true",
		value: true,
	},
	{
		label: "false",
		value: false,
	},
	{
		label: "1",
		value: 1,
	},
	{
		label: "0",
		value: 0,
	},
	{
		label: "-1",
		value: -1,
	},
	{
		label: '"true"',
		value: "true",
	},
	{
		label: '"false"',
		value: "false",
	},
	{
		label: '"1"',
		value: "1",
	},
	{
		label: '"0"',
		value: "0",
	},
	{
		label: '"-1"',
		value: "-1",
	},
	{
		label: '""',
		value: "",
	},
	{
		label: "null",
		value: null,
	},
	{
		label: "undefined",
		value: undefined,
	},
	{
		label: "Infinity",
		value: Infinity,
	},
	{
		label: "-Infinity",
		value: -Infinity,
	},
	{
		label: "[]",
		value: [],
	},
	{
		label: "{}",
		value: {},
	},
	{
		label: "[[]]",
		value: [[]],
	},
	{
		label: "[0]",
		value: [0],
	},
	{
		label: "[1]",
		value: [1],
	},
	{
		label: "NaN",
		value: NaN,
	},
]
