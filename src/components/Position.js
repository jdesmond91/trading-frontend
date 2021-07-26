import React from 'react'
import { useSelector } from 'react-redux'

const Position = () => {
	const positions = useSelector((state) => state.positions.value)

	return (
		<section className='section'>
			<table className='table'>
				<thead className='table__head'>
					<tr className='table__row'>
						<th className='table__heading'></th>
						<th className='table__heading'>Quantity</th>
						<th className='table__heading'>Price</th>
						<th className='table__heading'>Total Value</th>
					</tr>
				</thead>
				<tbody className='table__body'>
					{positions.map((position) => {
						return (
							<tr className='table__row' key={position.id}>
								<td className='table__data'>{position.security.name}</td>
								<td className='table__data'>{position.quantity}</td>
								<td className='table__data'>{position.security.price}</td>
								<td className='table__data'>{position.totalValue}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</section>
	)
}

export default Position
