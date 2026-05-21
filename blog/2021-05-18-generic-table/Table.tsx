export function Table() {
	return (
		<table>
			<thead>
				<tr>
					<th>Country</th>
					<th>Capital</th>
					<th>Date format</th>
					<th>Internet TLD</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Sweden</td>
					<td>Stockholm</td>
					<td>YYYY-MM-DD</td>
					<td>.se</td>
				</tr>
				<tr>
					<td>Germany</td>
					<td>Berlin</td>
					<td>DD.MM.YYYY</td>
					<td>.de</td>
				</tr>
				<tr>
					<td>Brazil</td>
					<td>Brasília</td>
					<td>DD/MM/YYYY</td>
					<td>.br</td>
				</tr>
			</tbody>
		</table>
	)
}
