import React from 'react'
import { useSelector } from 'react-redux'

const Position = () => {
	const positions = useSelector((state) => state.positions.value)

	return (
		<table className='background'>
			<thead>
				<tr>
					<th></th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Total Value</th>
				</tr>
			</thead>
			<tbody>
				{positions.map((position) => {
					return (
						<tr key={position.id}>
							<td>{position.security.name}</td>
							<td>{position.quantity}</td>
							<td>{position.security.price}</td>
							<td>{position.totalValue}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default Position
